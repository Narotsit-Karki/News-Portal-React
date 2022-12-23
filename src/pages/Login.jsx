import axios from "axios";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { set } from "../app/userSlice";
import { Link,useNavigate } from "react-router-dom";
import { setAlertMessage,removeAlertMessage} from "../app/alertSlice";
import logo from "../assets/icon/logo-128x128.png"
import "../css/style.css"
import { Alert } from "bootstrap";

export const Login = () =>{
    const dispatch = useDispatch()
    let[ has_error_username,setErrorUsername] = useState(false)
    let[ has_error_password,setErrorPassword] = useState(false)
    
    let[form,setForm] = useState({
        username:'',
        password:''
    })
    
    let[spinner,setSpinner] = useState(false)
    let[message,setErrorMessage] = useState('')
    const navigate = useNavigate();
    

    const handleForm = (e) => {
        setErrorPassword(false);
        setErrorUsername(false);
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
    }

    const userAuthenticate = () => {
        if( form.username==""){
            setErrorUsername(true)
            setErrorMessage('please enter username')
            return false
        }

        if(form.password==""){
            setErrorPassword(true)
            setErrorMessage('please enter password')
            return false
        }
       
        setErrorPassword(false)
        setErrorUsername(false)
        setSpinner(true)
        
        axios.post(`${import.meta.env.VITE_API_URL}/login/`,{
            'username':form.username,
            'password':form.password,
            
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
                    dispatch(setAlertMessage({
                        message:'logged in successfully',
                        alert_type: 'success'
                    }))
                    localStorage.setItem('user', JSON.stringify(payload))
                    navigate('/')
                }else{
                    dispatch(setAlertMessage({
                        message:'username or password not valid',
                        alert_type:'danger'
                    }))
                    setSpinner(false);
                }
            }).catch(
            (err) => {
                console.log(err);
                dispatch(setAlertMessage({message:'some error occurred try again later',alert_type:'danger'}))
                setSpinner(false);
                
            }
        );
    }

  
    return <>
        <div className="container mt-4 bg-light rounded-top shadow">
           <div className='row'>
          
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
                    <input onInput={handleForm} className="form-control"  value={form.username} name="username" type="text" placeholder="username"></input>
                </div>
                {has_error_password?<span className='text text-danger '>{message}</span>:''}
                <div className="col-12 mt-1">
                    <input onInput={handleForm} className="form-control"name="password" value={form.password} type="password" placeholder="password"></input>
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