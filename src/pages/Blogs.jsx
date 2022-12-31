import axios from "axios"
import { useEffect, useState } from "react"
import { BlogCard } from "../components/BlogCard"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAlertMessage} from "../app/alertSlice"
export const Blog = () => {
    let [blogs,setBlogs] = useState([])
    let dispatch = useDispatch()
    let user = useSelector(state => state.user.isAuthenticated)
    useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blogs`).then(
        (resp) => {
            setBlogs(resp.data);
        }
    ).catch((err) => {
        dispatch(setAlertMessage(
            {
                message:'Some error occurred while retreiving blogs!',
                alert_type:'danger'
            }
        ))
    })}
    ,[])

    return <>
        <div className="col-12 mt-2">
        {user?
        <Link to="/create-blog" className="btn btn-success">
            <i className="fa-solid fa-plus"></i> Create Blog
        </Link>:<Link to="/login" className="btn btn-primary">
            <i className="fa-solid fa-sign-in"></i> Log in to Create Blog
        </Link>
        }
        </div>
        <div className="row">  
        {blogs.length !=0?blogs.map((blog) => {
                    return <BlogCard blog={blog}/>
                })
                :  
                <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary m-5" style={{width:'4rem',height:'4rem'}} role="status">
                <span className="sr-only">Loading...</span>
                </div>
                </div>
        }
        </div>
     </>
}