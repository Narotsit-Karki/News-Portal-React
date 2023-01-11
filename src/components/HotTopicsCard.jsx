import logo from "../assets/icon/logo-512x512.png"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


import { Link } from "react-router-dom";

export const TopicsCard = ({news}) => {
    
    if(news.urlToImage === null||news.urlToImage==" "){
        news.urlToImage = logo
    }else if(news.author === null){
        news.author= news.source.name
    }

    let parse_date =new Date(news.publishedAt)
    news.publishedAt = parse_date.toDateString()

    return <>
        <div className="col-4 mt-2">
            <Link className="text text-decoration-none" to="/news-detail" state={{data:news}}>
            <div className="card rounded-0 topics-card">
            <div className="top-image-card">
                <img className="hot-img"src={news.urlToImage} alt="Card image cap"/>
                <div className="middle">
                    <h4 className="text text-light"><i className="fa-solid fa-eye"></i></h4>
                </div>
             </div>
            <div className="card-body">
                <h6 className="card-title ">{news.title}</h6>
                <div className="card-footer">
                <div className="row">
                    <div className="col-12">
                        <small className="text text-success">Source: </small>
                        <small>{news.source.name}</small>
                    </div>
                    <div className="col-12">
                            <small className="text text-success">Published: </small> 
                            <small className="text text-muted">{news.publishedAt}</small>
                    </div>
                </div>
                </div>
            
            </div>
            </div>
            </Link>
        </div>
    </>
}

