
import { Link, Outlet } from "react-router-dom"
import "../css/style.css"
import logo from "../assets/icon/logo-64x64.png"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
// import { loggedin, loggedout } from '../app/userSlice';
import { useEffect } from "react";
import axios from "axios";
export const BaseLayout = () => {
    const dispatch = useDispatch();
    let isAuthenticated = false;
//     useEffect(()=>{
//         let login = JSON.parse(window.localStorage.getItem('isAuthenticated'))
//         if (login){
//             dispatch(loggedin())
//         }else{
//             dispatch(loggedout())
//         }
//     },[]
//     )
//    const isAuthenticated = useSelector(state => state.login.value)

//    const Logout = () => {
//     axios.post(`${import.meta.env.VITE_API_URL}/logout`,{
//         headers:{'Authorization': `Token`

//     }})
//     window.localStorage.setItem('isAuthenticated',false);
//     window.localStorage.removeItem('token');
//     // dispatch(loggedout())
// }
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
                    <Link className="dropdown-item" to="#"><i className="fa-solid fa-circle-info text-info"></i> About Us</Link>
                    <Link className="dropdown-item" to="#"><i className="fa-solid fa-phone text-warning"></i> Contact Us</Link>
                    <Link className="dropdown-item"  to='#'>Blogs</Link>
                <div className="dropdown-divider"></div>
                {! isAuthenticated?
                <Link className="dropdown-item" to="/login"><i className="fa-solid fa-sign-in text-success"></i> Login</Link>
                :''}
                <Link className="dropdown-item" to="/join"><i className="fa-solid fa-user-plus text-success"></i> Join us</Link>
                </div>
                </li>
                
                {isAuthenticated?
                     <li className="nav-item dropdown">
                     <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     NarotsitK
                     </a>
                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                     <Link className="dropdown-item" to="#"><i className="fa-solid fa-user text-primary"></i> Account</Link>
                     <Link className="dropdown-item" to="/" onClick={Logout}><i className="fa-solid fa-sign-out text-danger"></i> Logout</Link>
                 </div>
                 </li>:
                ''}
            </ul>
        </div>

    </div>
</nav>

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