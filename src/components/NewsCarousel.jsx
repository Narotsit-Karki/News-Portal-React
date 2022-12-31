import Carousel from 'react-bootstrap/Carousel';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export const NewsCarousel = ({news}) => {
    return <>
    <Carousel>
    {
        news.map((nw) =>{
        if(!(nw.urlToImage===null)){
           
            return (
                <Carousel.Item>
                    <img height="550px"
                    className="w-100"
                    src={nw.urlToImage}
                alt="top headline slide"/>
                <Carousel.Caption>
                    <h3 className="text text-warning fst-bold bg-dark">{nw.title}</h3>
                    <div className='fst-bold text-dark bg-light'>{ReactHtmlParser(nw.description)}</div>
                    </Carousel.Caption>
            </Carousel.Item>)
            }
        })
    }

    </Carousel>
    </>
}