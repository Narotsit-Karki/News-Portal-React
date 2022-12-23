import logo from "../assets/icon/logo-128x128.png"
import "../css/style.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


export const Signup = () => {

    let[spinner,setSpinner] = useState(false)
    let[message ,setErrorMessage] = useState('')

    let[has_error_username,setErrorUsername] = useState(false)
    let[has_error_email,setErrorEmail] = useState(false)
    let[has_error_password,setErrorPassword] = useState(false)
    let[has_error_confirm_password,setErrorConfirmPassword] = useState(false)
    let[has_error_f_name,setErrorFirstName] = useState(false)
    let[has_error_l_name,setErrorLastName] = useState(false)
    let[has_error_phone,setErrorPhone] = useState(false)

    let [firstname , setFirstname] = useState('')
    let [lastname , setLastname] = useState('')
    let [username,setUsername] = useState('')
    let[password,setPassword] = useState('')
    let[confirmpassword,setConfirmPassword] = useState('')
    let[email,setEmail] = useState('')

    const navigate = useNavigate()
    const valiDateData = () => {
        const aplhaExp = /^[a-zA-Z ]+$/;
        const phoneExp = /^[0-9]{10}$/;
    
        if(firstname == "" || !firstname.match(aplhaExp)){
            setErrorFirstName(true);
            setErrorMessage('please enter valid first name')
            return false
        }
        
        if(lastname == ""&& !lastname.match(aplhaExp)){
            setErrorLastName(true)
            setErrorMessage('please enter valid last name')
            return false
        }

        if( username=="" && !username.match(aplhaExp)){
            setErrorUsername(true)
            setErrorMessage('please enter valid username')
            return false
        }

        if( email==""){
            setErrorUsername(true)
            setErrorMessage('please enter valid email address')
            return false
        
        }

        if(password==""){
            setErrorPassword(true)
            setErrorMessage('please enter password')
            return false
        }else if(password.length<8){
            setErrorPassword(true)
            setErrorMessage('please enter password of length greater than 8')
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
            return false
        }
        return true
    }
    
    const SignupUser=()=>{
        if(valiDateData()){
            setSpinner(true)
            axios.post(
                `${import.meta.env.VITE_API_URL}/register/`,{
                    'username':username,
                     'first_name':firstname,
                     'last_name':lastname,
                     'password':password,
                     'password2':confirmpassword,
                     'email':email
                }
            ).then(
                (response) => {
                    console.log(response)
                    if(response.status == 201 && response.statusText=='Created'){
                        setSpinner(false)
                        navigate("/login")
                    }
                }
            ).catch(
                (err) =>{
                    setSpinner(false)
                    setAlert(true)
                    setErrorMessage(err)
                }
            )
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
                    <div className="row">
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
                      <div className="col-6">
                        {has_error_phone?<span className='text text-danger'>{message}</span>:''}
                        <input type="number" className="form-control rounded-pill" onInput={(e) => {setPhone(e.target.value);
                        setErrorPhone(false);
                        }} required placeholder="phone number"/>
                      </div>

                        {has_error_username?<span className='text text-danger ms-2'>{message}</span>:''}
                        <div className="col-12 mt-2">
                        <input onInput={(e) => {setUsername(e.target.value)
                             setErrorUsername(false);
                        }} className="form-control rounded-pill" required type="text" placeholder="username"></input>
                        </div>

                        {has_error_email?<span className='text text-danger ms-2'>{message}</span>:''}
                        <div className="col-12 mt-2">
                        <input onInput={(e) => {setEmail(e.target.value)
                             setErrorEmail(false);
                        }} className="form-control rounded-pill" required type="email" placeholder="email address"></input>
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