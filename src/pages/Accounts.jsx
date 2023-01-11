import { Card, Modal } from "react-bootstrap"
import axios from "axios"
import  Alert  from "react-bootstrap/Alert"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAlertMessage } from "../app/alertSlice"
import { set } from "../app/userSlice"
import { Link } from "react-router-dom"
import { BlogCardUser } from "../components/BlogCard"
export const Accounts = () => {
    let[spinner_1,setSpinner_1] = useState(false);
    let[spinner_2,setSpinner_2]=useState(false);
    const [smShow, setSmShow] = useState(false);
    let[blogs,setBlogs] = useState([])
    

    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user.value)
    const [profile,setProfile] = useState({})
    let initial = {
        value:'',
        has_error:false,
        error_message:''
    }
    
    const[delete_blog,setDeleteBlog]=useState({})
    const[changed,setChanged] = useState(false)

    const[first_name,setFirstname]=useState(initial)
    const[last_name,setLastname]=useState(initial)
    const[email,setEmail] = useState(initial)
    const[old_password,setOldPassword] = useState(initial)
    const[new_password,setNewPassword] = useState(initial)
    const[confirm_password,setConfirmPassword] = useState(initial)
    const[username,setUsername]= useState(initial)
    const aplhaExp = /^[a-zA-Z]+$/;
    const emailExp = /^\w+([\.]?\w+)*@([\.]?\w+)*(\.\w{2,3})$/
    const usernameExp = /[a-zA-Z0-9_@.]+/
    const [alert,setMessage]=useState({value:false,alert_type:'',message:''})
   
   useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/user-detail/`,{
            headers:{
                Authorization:`Token ${user.token}`
            }
        }).then((resp) => {
            setBlogs(resp.data.blog) 
            setProfile(resp.data.profile)
            setFirstname({...first_name,value:resp.data.profile.first_name})
            setLastname({...last_name,value:resp.data.profile.last_name})
            setEmail({...email,value:resp.data.profile.email})
            setUsername({...username,value:resp.data.profile.username})
            
        }).catch((error)=>{
            console.log(error)
        })
    },[user,changed]
    )


    const deleteBlog = () => {
        axios.delete(`${import.meta.env.VITE_API_URL}/blog/${delete_blog.id}`,{
            headers:{
                Authorization:`Token ${user.token}`
            }
        }).then((resp) => {
            if(resp.status == 204 && resp.statusText=='No Content'){
                setSmShow(false)
                dispatch(setAlertMessage({
                    message:'Blog deleted Successfully',
                    alert_type:'success'
                }))
            }
        }
        ).catch(err=>console.log(err))
    }

    const validateProfileData = () => {
        if(first_name.value == "" || !first_name.value.match(aplhaExp)){
            setFirstname({
                ...first_name,
                has_error: true,
                error_message:'enter a valid firstname'
            })
            return false
            }
        
        if(last_name.value == ""||!last_name.value.match(aplhaExp)){
           setLastname({
                ...last_name,
                has_error:true,
                error_message:'enter a valid last name'})
            return false
        }
        
        if(username.value==""|| !username.value.match(usernameExp)){
            setUsername({
             ...username,
             has_error:true,
             error_message: 'enter a valid username'
          })
             return false
         }

        if(email.value==""|| !email.value.match(emailExp)){
           setEmail({
            ...email,
            has_error:true,
            error_message: 'enter a valid email address'
         })
            return false
        }
        return true;
    }

    const validatePassword = () => {
        if(old_password.value.length == 0 ||old_password.value.length < 8){
            setOldPassword({
                ...old_password,
                has_error:true,
                error_message:'password length must be greater than 8'
            })
            return false
        }
        if(new_password.value.length == 0 ||new_password.value.length < 8){
            setNewPassword({
                ...new_password,
                has_error:true,
                error_message:'password length must be greater than 8'
            })
            return false
        }
        if(confirm_password.value != new_password.value){
            setConfirmPassword({
                ...confirm_password,
                has_error:true,
                error_message:'password must match on both fields'
            })
            return false
        }
        return true
    }

    const updatePassword = () => {
        if(validatePassword()){
            setSpinner_2(true)
            axios.put(
                `${import.meta.env.VITE_API_URL}/change_password/${user.user_id}`,{
                    old_password:old_password.value,
                    password:new_password.value,
                    password2:confirm_password.value
                },{
                    headers:{
                        Authorization:`Token ${user.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                 } ).then((resp) =>{
                    if(resp.status == 200 && resp.statusText=='OK'){
                        setMessage({
                            value:true,
                            message:'Password Updated Successfully',
                            alert_type:'success'
                        })
                        setOldPassword(initial)
                        setNewPassword(initial)
                        setConfirmPassword(initial)
                } }).catch((error) => {
                    HandleErrors(error.response.data)
                }).finally(()=>{
                    setSpinner_2(false)                  
                })
        }
    }
    
    const updateProfile = () => {
        if(validateProfileData()){
            setSpinner_1(true);
            axios.put(
                `${import.meta.env.VITE_API_URL}/update_profile/${user.user_id}`,
                {
                    first_name:first_name.value,
                    last_name:last_name.value,
                    email:email.value,
                    username:username.value
                },{
                    headers:{
                        Authorization:`Token ${user.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((resp) => {
                if(resp.status == 200 && resp.statusText=='OK'){
                    // setting new user value locally and in redux
                    let payload =  {
                        token:user.token,
                        username:resp.data.username,
                        user_id:user.user_id,
                        email:resp.data.email
                    }
                    dispatch(set(payload))
                    localStorage.setItem('user', JSON.stringify(payload))

                    dispatch(setAlertMessage({
                        message:'Profile Updated Successfully',
                        alert_type:'success'
                    }))
                }   
            }).catch((error) =>{
                HandleErrors(error.response.data)
            }).finally(() => {
                setSpinner_1(false)               
            })
        }
    }

    const HandleErrors = (errors) => {
        const keys = Object.keys(errors)
        console.log(errors)
        keys.forEach((key,index) => {
            switch(key){
                case 'email':
                    
                    setEmail({
                        ...email,
                        has_error:true,
                        error_message:errors.email.message
                    })
                    break;
                case 'username':
                    setUsername(
                        {
                            ...username,
                            has_error:true,
                            error_message:errors.username.message
                        }
                    )
                    break;
                case 'old_password':
                    setOldPassword(
                        {
                            ...old_password,
                            has_error:true,
                            error_message:errors.old_password.message
                        }
                    )
                    break;
            }
        });
    }
    
    return <>
       {Object.keys(profile).length != 0?
        <div className="d-flex justify-content-center">
            <div className="container">
                <h2 className="text text-success">Account Setting</h2>
                <div className="row m-2 shadow">
                    <h4 className="text text-primary">General Setting</h4>
                    <div className="col-6">
                        <label className="text text-muted">First Name</label>
                        <input value={first_name.value} className={`form-control ${first_name.has_error && 'is-invalid'} round-pill`} required type="text" placeholder="first name" onInput={(e) => {
                            setFirstname({
                                ...first_name,
                                value:e.target.value,
                                has_error:false
                            });
                        }}/>
                    {first_name.has_error && <div className='text text-danger'>{first_name.error_message}</div>}
                        

                    </div>
                    <div className="col-6">
                        <label className="text text-muted">Last Name</label>
                        <input value={last_name.value} className={`form-control ${last_name.has_error && 'is-invalid'} round-pill`} required type="text" placeholder="last name" onInput={(e) => {
                            setLastname({
                                ...last_name,
                                value:e.target.value,
                                has_error:false
                            });
                        }}/>
                    {last_name.has_error && <div className='text text-danger'>{last_name.error_message}</div>}

                    </div>
                    <div className="col-12">
                        <label className="text text-muted">Username </label>
                        <input value={username.value} className={`form-control ${username.has_error && 'is-invalid'} round-pill`} required type="text" placeholder="first name" onInput={(e) => {
                            setUsername({
                                ...username,
                                value:e.target.value,
                                has_error:false
                            });
                        }}/>
                    {username.has_error && <div className='text text-danger'>{username.error_message}</div>}

                    </div>
                    <div className="col-12">
                        <label className="text text-muted">Email Address</label>
                        <input value={email.value} className={`form-control ${email.has_error && 'is-invalid'} round-pill`} required type="text" placeholder="first name" onInput={(e) => {
                            setEmail({
                                ...email,
                                value:e.target.value,
                                has_error:false
                            });
                        }}/>
                    {email.has_error && <div className='text text-danger'>{email.error_message}</div>}

                    </div>
                    {spinner_1? 
                    <div className="col-12 my-2">
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Updating Profile...
                            </button>
                        </div>
                    :<div className="col-6 my-2">
                        <button className="btn btn-success" onClick={updateProfile}>submit</button>
                    </div>}
                </div>
                
                <div className="row m-2 shadow">
                <h4 className="text text-primary">Change Password</h4>
                { alert.value?
                <div className= "col-12 my-2">
                    <Alert variant={alert.alert_type} dismissible onClose={() =>{setMessage({...alert,value:false})}} closeLabel="foo">
                        <strong>{alert.message}</strong>
                    </Alert>
                </div>
                :'' }
                <div className="col-12">
                    <label className="text text-muted">Old password</label>
                    <input value={old_password.value} className={`form-control ${old_password.has_error && 'is-invalid'} round-pill`} required type="password" placeholder="Enter old password" onInput={(e) => {
                            setOldPassword({
                                ...old_password,
                                value:e.target.value,
                                has_error:false
                            });
                        }}/>
                    {old_password.has_error&& <div className='text text-danger'>{old_password.error_message}</div>}

                </div>
                <div className="col-12">
                    <label className="text text-muted">New password</label>
                    
                    <input value={new_password.value} className={`form-control ${new_password.has_error && 'is-invalid'} round-pill`} required type="password" placeholder="Enter new password" onInput={(e) => {
                            setNewPassword({
                                ...new_password,
                                value:e.target.value,
                                has_error:false
                            });
                        }}/>
                    {new_password.has_error && <div className='text text-danger'>{new_password.error_message}</div>}

                </div>
                <div className="col-12 my-2">
                    <label className="text text-muted">Confirm password</label>
                    <input value={confirm_password.value} className={`form-control ${confirm_password.has_error && 'is-invalid'} round-pill`} required type="password" placeholder="Enter confirm password" onInput={(e) => {
                            setConfirmPassword({
                                ...confirm_password,
                                value:e.target.value,
                                has_error:false
                            });
                        }}/>
                    {confirm_password.has_error && <div className='text text-danger'>{confirm_password.error_message}</div>}

                </div>
                {spinner_2? 
                    <div className="col-12 my-2">
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Updating Password..
                            </button>
                        </div>
                    :<div className="col-6 my-2">
                        <button className="btn btn-success" onClick={updatePassword}>submit</button>
                    </div>
                    }
                </div>
                <div className="row m-2 shadow">
                    <div className="col-12">
                        <h4 className="text text-success">Blogs</h4>
                        <div className="col-12">
                        <Link to="/create-blog" className="btn btn-success">
                            <i className="fa-solid fa-plus"></i> Create Blog
                        </Link>
                        </div>
                        <div className="col-12 mb-2">
                            {blogs.length == 0?<h2 className="text text-muted text-center mt-3">No Blogs yet Created</h2>:
                            blogs.map((blog) => {
                                return <>
                                    <div className="border shadow my-1 p-2">
                                        <BlogCardUser blog={blog}/>
                                        <div className="row">
                                            <div className="col-8">
                                            <Link to={`/blog/${blog.slug}`} className="card-link text-decoration-none mt-2 btn btn-primary "><i className="fa-solid fa-eye"></i> Read</Link>
                                            <Link to={`/edit-blog?slug=${blog.slug}&user=${user.user_id}`} className="card-link text-decoration-none mt-2 mx-2 btn btn-warning"><i className="fa-solid fa-pencil"></i> Edit</Link>
                                            <button onClick={() => {
                                                setSmShow(true)
                                                setDeleteBlog(blog)
                                            }} className="btn btn-danger mt-2 mx-2"><i className="fa-solid fa-trash"></i> Delete</button>
                                        </div>
                                    </div>
                                    </div>
                                </>
                                }
                            )
                            }
                        </div>
                   
                    </div>
                </div>
                {/* Modal for delete*/}
                <Modal  size="md" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-sm">
                                            Are you sure you want to delete?
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Card>
                                            <Card.Header className="text text-primary">
                                                {delete_blog.title}
                                            </Card.Header>
                                            <Card.Img src={`${import.meta.env.VITE_SERVER_URL}${delete_blog.header_image}`} height="200px" style={{'object-fit':'cover'}}>
                                            </Card.Img>
                                        </Card>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className="btn btn-danger" onClick={deleteBlog}><i className="fa-solid fa-trash"></i> Delete</button>
                                        <button className="btn btn-primary" onClick={()=>{setSmShow(false)}}><i className="fa-solid fa-x"></i> Cancel</button>
                                        </Modal.Footer>
                </Modal>
            </div>
        </div>:''}
    </>
}