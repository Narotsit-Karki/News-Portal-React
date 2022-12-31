import  Carousel  from "react-bootstrap/Carousel"
import { TopicsCard } from "./HotTopicsCard"
export const TopicsCarousel = ({topicnews}) => {
    return <>
    <Carousel fade indicators={false} variant={"dark"}>
        {/* <div className="row"> */}
                            <Carousel.Item>
                            <div className="row" >
                                
                            { 
                                topicnews.slice(0,3).map((news) => {
                                    return <TopicsCard news={news}/>
                             })
                            }
                            </div>
                            </Carousel.Item>
                            
                            <Carousel.Item>
                            <div className="row" >
                                
                                { 
                                    topicnews.slice(3,6).map((news) => {
                                        return <TopicsCard news={news}/>
                                })
                                }
                               
                            </div>

                            </Carousel.Item>
                            
                            <Carousel.Item>
                            <div className="row" >
                                
                                { 
                                    topicnews.slice(6,8).map((news) => {
                                        return <TopicsCard news={news}/>
                                })
                                }
                                <div className="col-4">
                                <div className="card rounded-0">
                                    <div className="card-body">
                                        <h3>View more related to this topic</h3>
                                    </div>
                                   <div className="card-footer align-baseline">
                                     <button className="btn btn-primary w-100">
                                        more...
                                     </button>
                                   </div>
                               </div>
                                </div>
                            </div>
                            </Carousel.Item>
            {/* </div> */}
    </Carousel>
    </>
}