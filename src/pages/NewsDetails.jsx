import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from "axios";

export const NewsDetail = () => {
    const location = useLocation();
    const news = location.state?.data;
    const date = new Date(news.publishedAt)
    news.publishedAt = date.toDateString()
    const [content,setContent] = useState('')

    useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/get-news-details`,{
        headers:{
            'Content-Type': "Application/json"
        },
        params: {
            'url': news.url
        }
    } ).then((resp) => {
        setContent(resp.data)
    }).catch((err) => {console.log(err)})
    },[])
    return <>
    {content.length != 0? <div className="d-flex justify-content-center">
        <div className="container">
        <h2 className='news-title mt-2'>{news.title}</h2> 
            <img src={news.urlToImage} className="image-fluid rounded-2" style={{objectFit:'cover' ,height:'600px',width:'900px'}} />
            <div className="blog-author mt-2"> Posted by <strong className="text text-primary">{news.author}</strong> on <label className="text text-muted">{news.publishedAt}</label></div>
            {news.source.name!=null?
            <div className="blog-author mt-2"> Source <strong className="text text-primary">{news.source.name}</strong></div>:''
            }
            <div className="col-12 mt-1">
            <a href={news.url} className="btn btn-primary text text-decoration-none"> view source</a>
            </div>
            <div className="blog-description">
                {ReactHtmlParser(news.description)}
            </div>
            <div className="news-content my-2">
                           {ReactHtmlParser(content)}    
            </div> 
        </div>
    </div>:<div className="d-flex justify-content-center">
    <div className="spinner-border text-success m-5" style={{width:'4rem',height:'4rem'}} role="status">
    <span className="sr-only">Loading...</span>
    </div>
    </div>
    }
    </>
}