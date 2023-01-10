import axios from "axios"
import { useEffect, useState } from "react"
import { BlogCard } from "../components/BlogCard"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAlertMessage} from "../app/alertSlice"
export const Blog = () => {
    const [ search,setSearch] = useState('')
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
    ,[]
    )

    
    const handleSearch = () =>  {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs/?search=${search}`).then(
            (resp) => {
                if(resp.data.length == 0){
                    dispatch(setAlertMessage({
                        message: `No Results found for ${search}`,
                        alert_type: 'info'
                    }))
                    return 
                    }else{
                        setBlogs(resp.data);
                        dispatch(setAlertMessage({
                            message: `${resp.data.length} Results found for ${search}`,
                            alert_type: 'success'
                        }))
                       
                    }
                    return
                }
        ).catch((err) => {
            console.log(err)
            dispatch(setAlertMessage(
                {
                    message:'Some error occurred while retreiving blogs!',
                    alert_type:'danger'
                }
            ))
        }).finally(()=>setSearch(''))
    }
    


    return <>
        <div className="col-12 mt-2">
            <div className="row">
            <div className="col-4">
            {user?
                <Link to="/create-blog" className="btn btn-success">
                    <i className="fa-solid fa-plus"></i> Create Blog
                </Link>:<Link to="/login" className="btn btn-primary">
                <i className="fa-solid fa-sign-in"></i> Log in to Create Blog
            </Link>
            }
            </div>
            <div className="col-8">
                <div className="input-group">
                <input onInput={(e)=>{setSearch(e.target.value)}} value= {search} type="search" className="form-control" placeholder="Search blog title,description,author..."/>
                <button onClick={()=>{
                    if(search != ''|| search.length > 5){
                    handleSearch()}
                    }} className="btn btn-success"><i className="fa-solid fa-search"></i></button>
                </div>
            </div>
            </div>
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