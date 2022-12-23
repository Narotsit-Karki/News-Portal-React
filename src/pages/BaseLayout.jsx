
import { Link, Outlet } from "react-router-dom"
import "../css/style.css"
import logo from "../assets/icon/logo-64x64.png"
import { useSelector,useDispatch } from "react-redux"
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from "react";
import axios from "axios";
import { setAlertMessage,removeAlertMessage} from "../app/alertSlice";
import { remove , set} from "../app/userSlice";





export const BaseLayout = () => {
    const dispatch = useDispatch();
    const has_error =  useSelector(state => state.alert.active)
    const alert = useSelector(state => state.alert.value)
    let user = useSelector(state => state.user.value)

    let isAuthenticated =useSelector(state => state.user.isAuthenticated)
    useEffect(()=>{
        let user_local = JSON.parse(localStorage.getItem('user'))
        if(user_local){
            dispatch(set(user_local))
        }
    },[]
    )
    
    const Logout = () => {
        let auth_headers = {
            Authorization: `Token ${user.token}`
        }
        axios.post(`${import.meta.env.VITE_API_URL}/logout/`,{},{
           headers: auth_headers
        }).then(
            (resp) => {
                
                if(resp.status == 204){
                    localStorage.removeItem('user')
                    dispatch(remove())

                    dispatch(setAlertMessage(
                        {
                            message:'logged out',
                            alert_type:'info'
                        }
                    ))
                }
            }
        ).catch(
            (err) => {
                console.log(err)
                dispatch(setAlertMessage(
                    {
                        message: 'Some error occurred',
                        alert_type: 'danger'
                    }
                    ))}
        )
    }
    
    
    return <>
        {/* navbar start */}
    <div className="container bg-white pt-3">   
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="row">
        <div className="col-auto">
            <h3 className="ms-2">
                <Link className="brand-name  navbar-brand" to="/">
                    <img src={logo} id="logo"/> Ajax News 
                </Link>
            </h3>
        </div>
    
        <div className="col-auto">
            <div className="input-group">
                <input className="form-control" placeholder="Search topics and more ..."/>
                <button className="btn btn-primary">
                    <i className="fa-solid fa-search"></i>
                </button>
            </div>
        </div>

        <div className='col-auto'>
            <ul className="navbar-nav">
                <li className="nav-item link">
                    <Link className="nav-link" to='/'>Top headlines</Link>
                </li>
                <li className="nav-item link">
                    <Link className="nav-link" to='/'>Sports</Link>
                </li>
                <li className="nav-item link">
                    <Link className="nav-link" to="/">
                        Weather
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    More
                    </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/about-us"><i className="fa-solid fa-circle-info text-info"></i> About Us</Link>
                    <Link className="dropdown-item" to="/contact-us"><i className="fa-solid fa-phone text-warning"></i> Contact Us</Link>
                    <Link className="dropdown-item"  to='#'>Blogs</Link>
                <div className="dropdown-divider"></div>
                {! isAuthenticated?
                <Link className="dropdown-item" to="/login"><i className="fa-solid fa-sign-in text-success"></i> Login</Link>
                :''}
                <Link className="dropdown-item" to="/join"><i className="fa-solid fa-user-plus text-success"></i> Join us</Link>
                </div>
                </li>
                
                {! isAuthenticated?
                  '':
                  <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.username}
                  </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="#"><i className="fa-solid fa-user text-primary"></i> Account</Link>
                  <button className="dropdown-item" to="#" onClick={Logout}><i className="fa-solid fa-sign-out text-danger"></i> Logout</button>
              </div>
              </li>}
            </ul>
        </div>

    </div>
</nav>
<div className="row">
{ has_error?
         <div className= "col-12 mt-3">
            <Alert variant={alert.alert_type} dismissible onClose={() =>{dispatch(removeAlertMessage())} } closeLabel="foo">
                <strong>{alert.message}</strong>
            </Alert>
        </div>
        :'' }
</div>
<Outlet/>
<footer className="row text-bg-light mt-4">
    <div className="col-4">
                <div className="col-12 m-1">
                    <img src={logo}></img>
                    <h2>Ajax News</h2>
                </div>
                <div className="col-12 m-1">
                    <strong>Email: </strong>
                    <a href="mailto:ajaxnews@gmail.com" className="text-decoration-none text-dark"> ajaxnews@gmail.com</a>
                </div>
    </div>

    <div className="col-4">
                <div className="col-12">
                    <h3>Find us on</h3>
                </div>
                <div className="col-12">
                    <a href="https://facebook.com" target="_blank" className="link-dark">
                        <i className="fa-brands fa-facebook fa-2x"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" className="link-dark ms-2">
                        <i className="fa-brands fa-twitter fa-2x"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" className="link-dark ms-2">
                        <i className="fa-brands fa-instagram fa-2x"></i>
                    </a>

                    <a href="https://snapchat.com" target="_blank" className="link-dark ms-2">
                        <i className="fa-brands fa-snapchat fa-2x"></i>
                    </a>
                </div>
    </div>

    <div className="col-4">
                <div className="col-12">
                    <h3>Subscribe to newsletter</h3>
                </div>
                <div className="col-12">
                    <div className="input-group">
                        <input  type='email' placeholder="Enter email ..." className="form-control"/>
                        <button className="btn btn-outline-light btn-success">Subscribe</button>
                    </div>
                </div>
     </div>

    <div className="col-12 text-center">
    &copy; Ajax News, 2022. All rights reserved.
    </div>
  </footer>
  </div>

 
</>
}