import axios from "axios";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { set } from "../app/userSlice";
import { Link,useNavigate } from "react-router-dom";
import logo from "../assets/icon/logo-128x128.png"
import "../css/style.css"


export const Login = () =>{
    let [username,setUsername] = useState('')
    let[password,setPassword] = useState('')
    let[has_error,setError] = useState(false)
    let[message ,setErrorMessage] = useState('')
    let[ has_error_username,setErrorUsername] = useState(false)
    let[ has_error_password,setErrorPassword] = useState(false)
    let[spinner,setSpinner] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

       

    const userAuthenticate = () => {
        if( username==""){
            setErrorUsername(true)
            setErrorMessage('please enter username')
            return false
        }

        if(password==""){
            setErrorPassword(true)
            setErrorMessage('please enter password')
            return false
        }
       
        setErrorPassword(false)
        setErrorUsername(false)
        setSpinner(true)
        
        axios.post(`${import.meta.env.VITE_API_URL}/login/`,{
            'username':username,
            'password':password,
            
        }).then(
            (response) => {
                if(response.status == 200 && response.statusText == 'OK'){
                    setSpinner(false)
                    let payload =  {
                        expiry:response.data.expiry,
                        token:response.data.token,
                        username:response.data.user.username
                    }
                    dispatch(set(payload))
                    window.localStorage.setItem('user', payload)
                    navigate('/')
                }else{
                    console.log('error')
                    setError(true)
                    setErrorMessage('username or password not valid.')
                    return false
                }
            }
        ).catch(
            (err) => {
                console.log(err);
                setError(true);
                setSpinner(false);
                setErrorMessage('username or password not valid.')
            }
        );
    }

  
    return <>
        <div className="container mt-4 bg-light rounded-top shadow">
           <div className='row'>
           { has_error?
                <div className= "col-12 mt-3">
                    <div className="alert alert-danger alert-dismissible"  role="alert">
           <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=>{setError(false)}}>
               <span aria-hidden="true">&times;</span>
        </button>
           <small> {message} </small>
        </div>
        </div>
        :'' }
            <div className='col-6'>
                    <div className="col-12">
                        <img src={logo}></img>
                    </div>
                    <div className="col-12">
                        <h2 className="brand-name">Ajax News</h2>
                    </div>
                    <div className="col-12">
                        <small className="text text-success fs-4">Trusted News Platform</small>
                    </div>
            </div>
            <div className="col-6">
                {has_error_username?<span className='text text-danger '>{message}</span>:''}
                <div className="col-12 mt-1">
                    <input onInput={(e) => {setUsername(e.target.value)
                         setErrorUsername(false);
                    }} className="form-control" required type="text" placeholder="username"></input>
                </div>
                {has_error_password?<span className='text text-danger '>{message}</span>:''}
                <div className="col-12 mt-1">
                    <input onInput={(e) => {
                        setPassword(e.target.value);
                        setErrorPassword(false);
                        }}className="form-control" required type="password" placeholder="password"></input>
                </div>
                
                {spinner?
                <div className="col-12 mt-1">
                <button className="btn btn-primary w-100" type="button" disabled>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Verifying...
                 </button>
                 </div>
                 :
                    <div className="col-12 mt-1">
                    <button className="btn btn-primary w-100" onClick={userAuthenticate}>Login</button>
                    <hr/>
                    </div>
                }
                 
                <div className="col-12 mt-1">
                    <Link to="/join">
                    <button className="btn btn-success btn-md w-100">Join us</button>
                    </Link>
                </div>
        
            </div>
        </div>
    </div>
    </>
}