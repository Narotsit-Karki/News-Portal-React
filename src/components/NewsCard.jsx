import logo from "../assets/icon/logo-512x512.png"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export const NewsCard = ({news}) => {
    
    if(news.urlToImage === null||news.urlToImage==" "){
        news.urlToImage = logo
    }else if(news.author === null){
        news.author='Unknown'
    }

    let parse_date =new Date(news.publishedAt)
    news.publishedAt = parse_date.toUTCString()


    return <>
        
        <div className="card ms-2 mt-2" style={{width:'48%'}}>
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
                
                <p className="card-text fst-italic">{ReactHtmlParser(news.description)}</p>

                   {/* <button className="btn btn-primary w-100"><i className="fa-solid fa-eye"></i> view</button> */}
              
                </div>
            </div>
    </div>
    </>
}

