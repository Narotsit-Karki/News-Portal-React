import Carousel from 'react-bootstrap/Carousel';

export const NewsCarousel = ({news}) => {
    return <>
    <Carousel>
    {
        news.map((nw) =>{
        if(nw.urlToImage!=null){
            return (<Carousel.Item>
                    <img height="350px"
                    className="w-100 img-fluid"
                    src={nw.urlToImage}
                alt="top headline slide"/>
                <Carousel.Caption>
                    <h3 className="text text-warning fst-bold">{nw.title}</h3>
                    <p className='fst-bold'>{nw.description}</p>
                    </Carousel.Caption>
            </Carousel.Item>)
            }
        })
    }

    </Carousel>
    </>
}