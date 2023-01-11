import { useEffect,useState,useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlertMessage } from "../app/alertSlice";
import { useSearchParams } from "react-router-dom";

export const EditBlog = () => {
    const [params,setParams] = useSearchParams()
    
    let inital = {
        value:'',
        has_error:false,
        message:''
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [blog_id,setBlogid] = useState('')
    const [blog_title,setBlogTitle] = useState(inital)
    const[blog_desc,setBlogDesc] = useState(inital)
    const[blog_image,setBlogImage] = useState({...inital,value:undefined})
    const[blog_content,setBlogContent] = useState(inital)
    const [spinner,setSpinner] = useState(false)
    const [preview, setPreview] = useState(undefined)
    const [validation_error,setValidationError] = useState(false)
    
  

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/blogs/${params.get('slug')}`).then(
            (resp) => {
                setBlogTitle({...blog_title,value:resp.data.title})
                setBlogContent({...blog_content,value:resp.data.content})
                setBlogDesc({...blog_desc,value:resp.data.description})
                setPreview(`${import.meta.env.VITE_SERVER_URL}`+resp.data.header_image)
                setBlogid(resp.data.id)
            }
        ).catch((err)=>{
            dispatch(setAlertMessage({
                message:'Oh snap! error occurred while retrieving your blog',
                alert_type:'danger'
            }))
        })
    },[]
    )
    
    
    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setBlogImage({...blog_image,has_error:true,message:'please select an image file'})
            return false
        }else{
            setBlogImage({
                value:e.target.files[0],
                has_error:false,
                message:''
            })
            const objectUrl = URL.createObjectURL(e.target.files[0])
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        }
        
    }

    const putBlog = () => {
        let blog_data  = {}
        console.log(blog_image);
        if(blog_image.value){
        blog_data = {
            'title':blog_title.value,
            'description':blog_desc.value,
            'content':blog_content.value,
            'header_image':blog_image.value
        }
        }else{
            blog_data = {
                'title':blog_title.value,
                'description':blog_desc.value,
                'content':blog_content.value,
            }
        }
        axios.patch(`${import.meta.env.VITE_API_URL}/blog/${blog_id}/`,blog_data,{
            headers:{
                'content-type': 'multipart/form-data',
            }
        }
        ).then((resp) => {
            if(resp.status==200 && resp.statusText=='OK'){
                dispatch(setAlertMessage(
                    {
                        message: 'Blog updated Successfully',
                        alert_type: 'success'
                    }
                ))
                navigate('/accounts')
            }
        }).catch(
            (err)=>{
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
                if(validate_content()){
                    setSpinner(true)
                    putBlog()
                    return 
                 }
        }
    }
    setValidationError(true)
    }

    const validate_title = () => {
        if(blog_title.value =='' || blog_title.value.length < 8 ){
            setBlogTitle({
                ...blog_title,
                has_error:true,
                message:'blog title length must be greater than 8!'
            })
            return false
        }else{
            setBlogTitle({
                ...blog_title,
                has_error:false,
                message:''
            })
            return true
        }
    }

  
    const validate_description = () => {
        if(blog_desc.value =='' || blog_desc.value.length < 10 ){
          
            setBlogDesc({
                ...blog_desc,
                has_error:true,
               message:'description length must be greater than 10!'
            })
            return false
        }else{
            setBlogDesc({
                ...blog_desc,
                has_error:false,
                message:''
            })
            return true
        }
    }

    // const validate_file = () => {
    //   if(!blog_image.value){
    //         setBlogImage({
    //             ...blog_image,
    //             has_error:true,
    //             message:'Must select an image file'
    //         })
    //         return false
    //     }else{
    //         setBlogImage({
    //             ...blog_image,
    //             has_error:false,
    //             message:''
    //         })
    //         return true
    //     }
    // }

    const validate_content = () =>{
        if(blog_content.value == ''|| blog_content.value.length < 200){
            
            setBlogContent({
                ...blog_content,
                has_error:true,
                message:'Content Length must be greater than 200 characters!'
            })
            return false
        }else{
            setBlogContent({
                ...blog_content,
                has_error:false,
                message:''
            })
            return true
        }
    }
    

    return <>
    <div className="row">
        <div className="text text-primary h1">
            Edit the Blog
        </div>
        <div className="col-12">
            <div className="row">
                <div className="col-6">
                    <div className="col-12">
                        <label className="text text-secondary">Title (required)</label>
                        {blog_title.has_error && <span className="text text-danger"><br></br>{blog_title.message}</span>}
                        <input  value = {blog_title.value} onInput={(e)=>setBlogTitle({...blog_title,value:e.target.value})}name='title' className={`form-control ${blog_title.has_error && 'is-invalid'}`} placeholder="Your blog title"/>
                    </div>

                    <div className="col-12 mt-2">
                        <label className="text text-secondary">Description (required)</label>
                        <textarea onInput={(e)=>setBlogDesc({...blog_desc,value:e.target.value})}name='description' value={blog_desc.value} className={`form-control ${blog_desc.has_error && 'is-invalid'}`} placeholder="Your blog description"/>
                        {blog_desc.has_error && <span className="text text-danger"><br></br>{blog_desc.message}</span>}
                    </div>
                    <div className="col-12 mt-2">
                        <label className="text text-secondary">Blog Image (required)</label>
                        {blog_image.has_error && <span className="text text-danger"><br></br>{blog_image.message}</span>}
                        <input accept="image/*" name='header_image' onChange={(e)=>{onSelectFile(e);}} type="file" className={`form-control ${blog_image.has_error && 'is-invalid'}`}/>
                    </div>
                </div>
                <div className="col-6">
                    Preview Image
                    <div className="border">
                    {preview && <img src={preview} className="img-fluid preview"/>}
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <label className="text text-secondary">Blog Content (required)</label>
                    {blog_content.has_error && <span className="text text-danger"><br></br>{blog_content.message}</span>}
                    <Editor
                        // onInit={(evt, editor) => editorRef.current = editor}
                        onEditorChange={(newContent,editor) =>{
                            setBlogContent({...blog_content,value:newContent})
                        }}
                        value={blog_content.value}
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
                     updating...
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