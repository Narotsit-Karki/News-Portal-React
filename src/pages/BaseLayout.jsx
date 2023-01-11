
import { Link, Outlet, useNavigate } from "react-router-dom"
import "../css/style.css"
import logo from "../assets/icon/logo-64x64.png"
import { useSelector,useDispatch } from "react-redux"
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from "react";

import {removeAlertMessage} from "../app/alertSlice";
import { set} from "../app/userSlice";
import { setCountry } from "../app/countrySlice";
import { SearchForm } from "../components/SearchForm.";
import { Logout } from "./Logout";


const regions = [
{name:'Australia',code:'au'},
{name:'Canada',code:'ca'},
{name:'China',code:'cn'},
{name:'France',code:'fr'},
{name:'Germany',code:'de'},
{name:'India',code:'in'},
{name:'New Zealand',code:'nz'},
{name:'Russia',code:'ru'},
{name:'South Africa',code:'za'},
{name:'South Korea',code:'kr'},
{name:'Switzerland',code:'ch'},
{name:'United Kingdom',code:'gb'},
{name:'United States',code:'us'}
]

const categories = [
'business',
'entertainment',
'health',
'politics',
'science',
'sports',
'technology'
]

export const BaseLayout = () => {
    const dispatch = useDispatch();
    const has_error =  useSelector(state => state.alert.active)
    const alert = useSelector(state => state.alert.value)
    let user = useSelector(state => state.user.value)
    let navigate = useNavigate()
    let isAuthenticated =useSelector(state => state.user.isAuthenticated)
    
    useEffect(()=>{
        // get authenticated user info and dispatch set reducer to set user data
        let user_local = JSON.parse(localStorage.getItem('user'))
        console.log(user_local)
        if(user_local){
            dispatch(set(user_local))
        }
    },[]
    )
    
  
    
    return <>
        {/* navbar start */}
    <div className="container-fluid bg-white pt-3" style={{width:'98%'}}>   
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
           <SearchForm/>
        </div>

        <div className='col-auto'>
        
            <ul className="navbar-nav">
                {/* <li className="nav-item"> */}
                    {/* <Link className="nav-link" to='/'>Top headlines</Link> */}
                    
                    <select className="form-control rounded-pill" onChange={(e) =>{dispatch(setCountry(e.target.value))}}>
                        {regions.map((region)=>{
                            return <><option value={region.code}>{region.name}</option></>
                            })}
                    </select>
                
               
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Category
                    </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                    
                    {categories.map((cat)=>{
                        
                        return <button className="dropdown-item" onClick={()=>{navigate(`/category/${cat}`)}}>{cat}</button>
                    })
                    }
                 
                    </div>
                </li>
                
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    More
                    </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    
                    <Link className="dropdown-item" to="/about-us"><i className="fa-solid fa-circle-info text-info"></i> About Us</Link>
                    <Link className="dropdown-item" to="/contact-us"><i className="fa-solid fa-phone text-warning"></i> Contact Us</Link>
                    <Link className="dropdown-item"  to='/blogs'><i className="fa-solid fa-blog" style={{color:'#fc4f08'}}></i> Blogs</Link>
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
                  <Link className="dropdown-item" to="/accounts"><i className="fa-solid fa-user text-primary"></i> Account</Link>
                  <Logout token={user.token}/>
              </div>
              </li>}
            </ul>
        </div>

    </div>
</nav>
<div className="row">
{ has_error?
         <div className= "col-12 my-2">
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