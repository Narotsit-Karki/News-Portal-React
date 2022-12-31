import axios from "axios"
import { useEffect,useState } from "react"
import { Link, useParams } from "react-router-dom"
import { setAlertMessage } from "../app/alertSlice"
import { useDispatch } from "react-redux"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Carousel from 'react-bootstrap/Carousel';

import { RecommendBlog } from "../components/RecommendBlog"

export const BlogDetail = () => {
    const params = useParams()
    const [blog,setBlog] = useState({})
    const [blogs,setBlogs] = useState([])
    const dispatch = useDispatch()
    

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/blogs/${params.slug}`).then(
            (resp) => {
                    const date = new Date(resp.data.date)
                    resp.data.date = date.toDateString()
                    setBlog(resp.data)
            }
        ).catch(
            (err) => {
                dispatch(setAlertMessage(
                        {
                            message: 'Oh Snap! Blog not found',
                            aler_type:'danger'
                        }
                    )
                )
            }
        )
        
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
        })

    },[params.slug]
    )

    return <>
    {Object.keys(blog).length != 0?
    <div className="d-flex justify-content-center">
        <div className="container">
                <img className="img-fluid m-2 rounded-2" style={{objectFit:'cover' ,height:'600px',width:'900px'}} src={`${import.meta.env.VITE_SERVER_URL}${blog.header_image}`}></img>
                <div className="blog-author mt-2"> Posted by <strong className="text text-primary">{blog.user.username}</strong> on <label className="text text-muted">{blog.date}</label></div>
                <div className="blog-title fs-2 mt-2">{blog.title}</div>
                <div className="blog-description mt-2" style={{width:'90%'}}>
                  <small> {blog.description}</small>    
                </div> 
                <div className="blog-content">
                    {ReactHtmlParser(blog.content)}
                </div>
        </div>
    </div>
   
    :
      <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary m-5" style={{width:'4rem',height:'4rem'}} role="status">
      <span className="sr-only">Loading...</span>
      </div>
      </div>
    }
   {blogs.length != 0?
   <div>
        <h5 className="text text-secondary"> Recommended Blogs</h5>
        <Carousel variant={'dark'} indicators={false}>
      
        {
            blogs.map((recommend_blog) => {
                if(recommend_blog.id != blog.id){
                    
                return <Carousel.Item>
                        <div className="row">
                        <RecommendBlog blog={recommend_blog}/>
                        </div>
                    </Carousel.Item>       
            }
            }
            )
            
        }
     </Carousel> 
     </div>
   :''}
    </>
}