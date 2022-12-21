import logo from "../assets/icon/logo-128x128.png"
import "../css/style.css"
import { useState } from "react"
import { Link } from "react-router-dom"


export const Signup = () => {
    
    let[message ,setErrorMessage] = useState('')
    let[ has_error_username,setErrorUsername] = useState(false)
    
    let[ has_error_password,setErrorPassword] = useState(false)
    let[has_error_confirm_password,setErrorConfirmPassword] = useState(false)
    let[has_error_f_name,setErrorFirstName] = useState(false)
    let[has_error_l_name,setErrorLastName] = useState(false)
    

    let [firstname , setFirstname] = useState('')
    let [lastname , setLastname] = useState('')
    let [username,setUsername] = useState('')
    let[password,setPassword] = useState('')
    let[confirmpassword,setConfirmPassword] = useState('')

    const SignupUser=()=>{
        
        if(firstname == ""){
            setErrorFirstName(true)
            setErrorMessage('please enter first name')
            return false
        }
        
        if(lastname == ""){
            setErrorLastName(true)
            setErrorMessage('please enter last name')
            return false
        }

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

        if(confirmpassword==""){
            setErrorConfirmPassword(true)
            setErrorMessage('please fill this field')
            return false
        }

        if(confirmpassword != password){
            setErrorConfirmPassword(true)
            setErrorMessage('enter same password')
        }
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

                        <div className="col-6">
                            {has_error_f_name?<span className='text text-danger'>{message}</span>:''}
                            <input className="form-control rounded-pill" required type="text" placeholder="first name" onInput={(e) => {
                            setFirstname(e.target.value);
                            setErrorFirstName(false)
                        }}/>
                        </div>
                
                        <div className="col-6">
                        {has_error_l_name?<span className='text text-danger'>{message}</span>:''}
                        <input className="form-control rounded-pill" onInput={(e) => {setLastname(e.target.value);
                        setErrorLastName(false);
                        }} required type="text" placeholder="last name"/>
                        </div>
                
                        {has_error_username?<span className='text text-danger ms-2'>{message}</span>:''}
                        <div className="col-12 mt-2">
                        <input onInput={(e) => {setUsername(e.target.value)
                             setErrorUsername(false);
                        }} className="form-control rounded-pill" required type="text" placeholder="username"></input>
                        </div>

                        <div className="col-6 mt-2">
                        {has_error_password?<span class='text text-danger ms-2'>{message}</span>:''}

                            <input onInput={(e) => {
                                setPassword(e.target.value);
                            setErrorPassword(false);
                            }}className="form-control rounded-pill" required type="password" placeholder="password"></input>
                        </div>

                        <div className="col-6 mt-2">
                            {has_error_confirm_password?<span class='text text-danger ms-2'>{message}</span>:''}
                            <input onInput={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrorConfirmPassword(false);
                                }}className="form-control rounded-pill" required type="password" placeholder="confirm password"></input>
                        </div>

                        <div className="col-12 mt-2">
                        <button className="btn btn-primary w-100" onClick={SignupUser}>Signup</button>
                        <hr/>
                        </div>

                        <div className="col-12 m-1">
                        <Link to="/Login">
                            <button className="btn btn-success btn-md w-100">Already joined ? Login</button>
                        </Link>
                        </div>
                </div>
            </div>
        </div>
         </>
}