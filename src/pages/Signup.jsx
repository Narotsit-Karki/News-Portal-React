import logo from "../assets/icon/logo-128x128.png"
import "../css/style.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAlertMessage,removeAlertMessage} from "../app/alertSlice";

import axios from "axios"


export const Signup = () => {

    let[spinner,setSpinner] = useState(false)
    const dispatch = useDispatch()

    let initial = {
        value:'',
        has_error:false,
        error_message:''
    }
    
    let [firstname , setFirstname] = useState(initial)
    let [lastname , setLastname] = useState(initial)
    let [username,setUsername] = useState(initial)
    let[password,setPassword] = useState(initial)
    let[confirmpassword,setConfirmPassword] = useState(initial)
    let[email,setEmail] = useState(initial)

    
    const navigate = useNavigate()

    const valiDateData = () => {
        const aplhaExp = /^[a-zA-Z]+$/;
        const emailExp = /^\w+([\.]?\w+)*@([\.]?\w+)*(\.\w{2,3})$/
        
    
        if(firstname.value == "" || !firstname.value.match(aplhaExp)){
            setFirstname({
                ...firstname,
                has_error: true,
                error_message:'enter a valid firstname'
            })
            return false
            }
        
        if(lastname.value == ""||!lastname.value.match(aplhaExp)){
           setLastname({
                ...lastname,
                has_error:true,
                error_message:'enter a valid last name'})
            return false
        }

        if( username.value==""||!username.value.match(aplhaExp)){
           setUsername({
            ...username,
            has_error:true,
            error_message:'enter a valid username'
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

        if(password.value==""){
            setPassword({
                ...password,
                has_error:true,
                error_message:'password field cannot be empty'
            })
            return false
        }else if(password.value.length<8){
           setPassword({
            ...password,
            has_error:true,
            error_message: 'password length must be greater than 8'
           })
            return false
        }

        if(confirmpassword.value != password.value){
           setConfirmPassword({
            ...confirmpassword,
            has_error:true,
            error_message:"password don't match"
           })
            return false
        }
        return true
    }
    
    const SignupUser=()=>{
        if(valiDateData()){
            setSpinner(true)
            axios.post(
                `${import.meta.env.VITE_API_URL}/register/`,{
                    'username':username.value,
                     'first_name':firstname.value,
                     'last_name':lastname.value,
                     'password':password.value,
                     'password2':confirmpassword.value,
                     'email':email.value
                }
            ).then(
                (response) => {
                    
                    if(response.status == 201 && response.statusText=='Created'){
                        setSpinner(false)
                        dispatch(setAlertMessage({
                            message:'registered successfully',
                            alert_type:'success'
                        }))
                        navigate("/login")
                    }
                }
            ).catch(
                (err) =>{
                   HandleErrors(err.response.data)
                }
            ).finally(() => setSpinner(false))
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
            }
        });
    }
    
    
    
    return<>
            <div className="container mt-4 bg-light rounded-top shadow">
            <div className="row">
                <div className="col-4">
                    <div className="col-12">
                        <img src={logo}></img>
                    </div>
                    <div className="col-12">
                        <h4 className="brand-name">Ajax News</h4>
                    </div>
                    <div className="col-12">
                        <small className="text text-success fs-5">Trusted News Platform</small>

                    </div>
                </div>

                <div className="col-8">
                    <div className="row">
                    <div className="col-6">
                            <input value={firstname.value} className={`form-control ${firstname.has_error && 'is-invalid'} round-pill`} required type="text" placeholder="first name" onInput={(e) => {
                            setFirstname({
                                ...firstname,
                                value:e.target.value,
                                has_error:false
                            });
                        }}/>
                    {firstname.has_error?<div className='text text-danger'>{firstname.error_message}</div>:''}

                    </div>
                      <div className="col-6">
                        <input className={`form-control ${lastname.has_error && 'is-invalid'} round-pill`} onInput={(e) => {
                            setLastname({
                                value:e.target.value,
                                has_error:false,
                            })
                        }} required type="text" placeholder="last name"/>
                         {lastname.has_error?<div className='text text-danger'>{lastname.error_message}</div>:''}

                      </div>

                        <div className="col-12 mt-2">
                        <input onInput={(e) => {setUsername({
                            value:e.target.value,
                            has_error:false
                        })
                  
                        }} value={username.value} className={`form-control ${username.has_error && 'is-invalid'} round-pill`}required type="text" placeholder="username"></input>
                        {username.has_error?<div className='text text-danger ms-2'>{username.error_message}</div>:''}
                        </div>

                        <div className="col-12 mt-2">
                        <input onInput={(e) => {setEmail({
                            value:e.target.value,
                            has_error:false
                        })
                        }} value={email.value} className={`form-control ${email.has_error && 'is-invalid'} round-pill`} required type="email" placeholder="email address"></input>
                        {email.has_error?<div className='text text-danger ms-2'>{email.error_message}</div>:''}
                        </div>

                        <div className="col-6 mt-2">
                            <input onInput={(e) => {
                                setPassword({
                                    value:e.target.value,
                                    has_error: false
                                });
                            
                            }} value={password.value} className={`form-control ${password.has_error && 'is-invalid'} round-pill`} required type="password" placeholder="password"></input>
                            {password.has_error?<div class='text text-danger ms-2'>{password.error_message}</div>:''}
                        </div>
                        <div className="col-6 mt-2">
                            <input onInput={(e) => {
                                setConfirmPassword({
                                    value:e.target.value,
                                    has_error: false
                                });
                                
                                }}className={`form-control ${confirmpassword.has_error && 'is-invalid'} round-pill`} required type="password" placeholder="confirm password"></input>
                                {confirmpassword.has_error?<div class='text text-danger ms-2'>{confirmpassword.error_message}</div>:''}
                        </div>

                        {spinner?
                            <div className="col-12 mt-1">
                            <button className="btn btn-primary w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Registering...
                            </button>
                        </div>
                        :
                        <div className="col-12 mt-1">
                        <button className="btn btn-primary w-100" onClick={SignupUser}>Signup</button>
                        <hr/>
                        </div>
                    }
                 

                        <div className="col-12 mt-1 mb-1">
                        <Link to="/Login">
                            <button className="btn btn-success btn-md w-100">Already joined ? Login</button>
                        </Link>
                        </div>
                        </div>
                </div>
            </div>
        </div>
         </>
}