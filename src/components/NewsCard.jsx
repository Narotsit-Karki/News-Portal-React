import logo from "../assets/icon/logo-512x512.png"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Link } from "react-router-dom";
export const NewsCard = ({news}) => {
    
    if(news.urlToImage === null||news.urlToImage==" "){
        news.urlToImage = logo
    }else if(news.author === null){
        news.author= news.source.name
    }

    let parse_date =new Date(news.publishedAt)
    news.publishedAt = parse_date.toDateString()


    return <>
        <Link to="/news-detail" className="text-decoration-none" state={{data:news}}>
        <div className="card news-card mt-2 mx-2" style={{width:'100%'}}>
            <div className="row">
                <div className="col-4">
                    <img className="card-img-top news-card-img mt-1"src={news.urlToImage} alt="Card image cap"/>
                    <div className="card-middle">
                <h3 className="text text-light"><i className="fa-solid fa-eye"></i> view</h3>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <div className="row">
                <div className="col-12">
                    <strong className="text text-success">Source: </strong>
                    <span>{news.source.name}</span>
                    </div>
                    <div className="col-12">
                    <strong className="text text-success">Author: </strong>
                    <span>{news.author}</span>
                    </div>
                    <div className="col-12">
                    <strong className="text text-success">Published: </strong> 
                    <span className="text text-muted">{news.publishedAt}</span>
                    </div>
                  
                </div>
                <div className="card-footer mt-auto">
                
                <div className="card-text fst-italic text-dark">
                    {ReactHtmlParser(news.description)}
                </div>
              
                </div>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    </>
}

