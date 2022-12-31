import logo from "../assets/icon/logo-512x512.png"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export const NewsCard = ({news}) => {
    
    if(news.urlToImage === null||news.urlToImage==" "){
        news.urlToImage = logo
    }else if(news.author === null){
        news.author= news.source.name
    }

    let parse_date =new Date(news.publishedAt)
    news.publishedAt = parse_date.toUTCString()


    return <>
        
        <div className="card mt-2 mx-2" style={{width:'48%'}}>
            <img className="card-img-top mt-1"src={news.urlToImage} alt="Card image cap"/>
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
                
                <div className="card-text fst-italic">
                    {ReactHtmlParser(news.description)}
                </div>
              
                </div>
            </div>
    </div>
    </>
}

