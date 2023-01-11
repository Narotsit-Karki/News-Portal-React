import { useEffect,useState,useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlertMessage } from "../app/alertSlice";



export const CreateBlog = () => {
    
    const editorRef = useRef(null); 
    const user = useSelector(state => state.user.value)
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const [blog,setBlog] = useState({
        title: '',
        description: ''
    })
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedFile, setSelectedFile] = useState(undefined)
    const [preview, setPreview] = useState(undefined)
    const [content,setContent] = useState('')
    const [message,setMessage] = useState('')
    const [error_title,setErrorTitle] = useState(false)
    const [error_desc,setErrorDesc] = useState(false)
    const [error_file,setErrorFile] = useState(false)
    const [error_content,setErrorContent] = useState(false)
    const [validation_error,setValidationError] = useState(false)
    const [spinner,setSpinner] = useState(false)

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const handleBlog = (e) => {
        const {name,value} = e.target;
        setBlog({
            ...blog,
            [name]:value
        })
    }

    const validate_title = () => {
        if(blog.title =='' || blog.title.length < 8 ){
            setErrorTitle(true)
            setMessage('title length must be greater than 8!')
            return false
        }else{
            setErrorTitle(false)
            return true
        }
    }

    const validate_description = () => {
        if(blog.description =='' || blog.description.length < 10 ){
            setErrorDesc(true)
            setMessage('description length must be greater than 10!')
            return false
        }else{
            setErrorDesc(false)
            return true
        }
    }

    const validate_file = () => {
        if(!selectedFile.size < 0){
            setErrorFile(true)
            setMessage('Must select an image file')
            return false
        }else{
            setErrorFile(false)
            return true
        }
    }

    const validate_content = () =>{
        if(content == ''|| content.length < 200){
            setErrorContent(true)
            setMessage('Content Length must be greater than 200 characters!')
            return false
        }else{
            setErrorContent(false)
            return true
        }
    }

    const postBlog = () => {
        let blog_data = {
            user:user.user_id,
            'slug':Math.random().toString(16).slice(2),
            'title':blog.title,
            'description':blog.description,
            'content':content,
            'header_image':selectedFile
        }
        axios.post(`${import.meta.env.VITE_API_URL}/blog/`,blog_data,{
            headers:{
                'content-type': 'multipart/form-data',
                Authorization:`Token ${user.token}`
            }
        }
        ).then((resp) => {
            if(resp.status==201 && resp.statusText=='Created'){
                dispatch(setAlertMessage(
                    {
                        message: 'Blog posted Successfully',
                        alert_type: 'success'
                    }
                ))
                navigate('/blogs')
            }
        }).catch(
            (err)=>{
                console.log(err)
                dispatch(setAlertMessage(
                    {
                        message:'Oh Snap! Some error occurred',
                        alert_type: 'danger'
                    }
                ))
            }).finally(()=>setSpinner(false))
        }

    const submitBlog = () => {
        setValidationError(false)
        if(validate_title()){
            if(validate_description()){
                if(validate_file()){
                if(validate_content()){
                    setSpinner(true)
                    postBlog()
                    return 
                 }
            }
        }
    }
    setValidationError(true)
    }

    return <>
        <div className="row">
            <div className="text text-primary h1">
                Create A New Blog
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                        <div className="col-12">
                            <label className="text text-secondary">Title (required)</label>
                            {error_title && <span className="text text-danger"><br></br>{message}</span>}
                            <input onChange={handleBlog} onInput={validate_title}name='title' className={`form-control ${error_title && 'is-invalid'}`} placeholder="Your blog title"/>
                        </div>

                        <div className="col-12 mt-2">
                            <label className="text text-secondary">Description (required)</label>
                            {error_desc && <span className="text text-danger"><br></br>{message}</span>}
                            <textarea onChange={handleBlog} onInput={validate_description}name='description' value={blog.description} className={`form-control ${error_desc && 'is-invalid'}`} placeholder="Your blog description"/>
                        </div>
                        <div className="col-12 mt-2">
                            <label className="text text-secondary">Blog Image (required)</label>
                            {error_file && <span className="text text-danger"><br></br>{message}</span>}
                            <input accept="image/*" name='header_image' onChange={(e)=>{onSelectFile(e); 
                                validate_file();}} type="file" className={`form-control ${error_file && 'is-invalid'}`}/>
                        </div>
                    </div>
                    <div className="col-6">
                        Preview Image
                        <div className="border">
                        {selectedFile && <img src={preview} className="img-fluid preview"/>}
                        </div>
                    </div>
                    <div className="col-12 mt-2">
                        <label className="text text-secondary">Blog Content (required)</label>
                        {error_content && <span className="text text-danger"><br></br>{message}</span>}
                        <Editor
                            
                            onInit={(evt, editor) => editorRef.current = editor}
                            onEditorChange={(newContent,editor)=> {
                                setContent(newContent)
                                validate_content()
                            }}
                            initialValue="<p>Write your Contents Here</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            file_picker_types: 'image media',
                            file_picker_callback: (cb, value, meta) => {
                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');
                            
                                input.addEventListener('change', (e) => {
                                  const file = e.target.files[0];
                            
                                  const reader = new FileReader();
                                  reader.addEventListener('load', () => {
                                    /*
                                      Note: Now we need to register the blob in TinyMCEs image blob
                                      registry. In the next release this part hopefully won't be
                                      necessary, as we are looking to handle it internally.
                                    */
                                    const id = 'blobid' + (new Date()).getTime();
                                    const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                                    const base64 = reader.result.split(',')[1];
                                    const blobInfo = blobCache.create(id, file, base64);
                                    blobCache.add(blobInfo);
                            
                                    /* call the callback and populate the Title field with the file name */
                                    cb(blobInfo.blobUri(), { title: file.name });
                                  });
                                  reader.readAsDataURL(file);
                                });
                            
                                input.click();
                              },
                            plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | blockquote | image |' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | '
                            +'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        />
     </div>
                    
                    {spinner?
                     <div className="col-12 mt-1">
                     <button className={`btn btn-primary`} type="button" disabled>
                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                         creating...
                      </button>
                      </div>
                    :<div className="col-12 mt-2">
                        {validation_error && <span className="text text-danger">validation error look above<br/></span>}
                        <button className="btn btn-primary" onClick={()=>{
                            submitBlog()
                            }}>submit</button>
                    </div>
                }
                </div>      
            </div>
        </div>
   
    </>
}