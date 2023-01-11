import { useEffect,useState } from 'react'
import axios from 'axios'
import { NewsCarousel } from '../components/NewsCarousel'
import { useDispatch, useSelector } from 'react-redux'
import { TopicsCard } from '../components/HotTopicsCard'
import { Link } from 'react-router-dom'
import { setAlertMessage } from '../app/alertSlice'
import { Spinner } from 'react-bootstrap'

export const Home = () => {
    
    let topics = ["Crypto","Covid","Sports","Ukraine","Nepal"]

    let[topheadlines,setHeadlines] = useState([])
    let[hottopics,setHotTopics]= useState({})    
    
    const dispatch =  useDispatch()
    let country = useSelector(state => state.country.value) 
    
    useEffect(() => {
        setHeadlines([])
        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/top-headlines?country=${country}&apiKey=${import.meta.env.VITE_API_KEY_2}`).then(
            (resp) => {
                setHeadlines(resp.data.articles)
            }
        ).catch((err)=>{
            setHeadlines([0]);
            dispatch(setAlertMessage({
                message:'Oh snap! Some error occurred',
                alert_type: 'danger'
            }));
        })
       
        const requests = topics.map(topic => axios.get(`${import.meta.env.VITE_NEWS_API_URL}/everything?q=${topic}&language=en&apiKey=${import.meta.env.VITE_API_KEY_2}`))
        
        Promise.all(requests).then((responses) => {
                let newHotTopics = {}
                responses.forEach((response, i) => {
                    newHotTopics[topics[i]] = response.data.articles;
                });
                setHotTopics(newHotTopics);
            }).catch(error => {
                console.log(error);
                dispatch(setAlertMessage(
                    {
                        message:'Oh snap! some error occurred',
                        alert_type:'danger'
                    }
                ))
            })

    },[country])

    return <>
    { topheadlines.length == 0?
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary m-5" style={{width:'4rem',height:'4rem'}} role="status">
             <span className="sr-only">Loading...</span>
            </div>
        </div>
        :<div className='row'>
            <div className="top-headlines">
                <div className='rounded-top border shadow p-2'>
                    <div className='col-12'>
                <h3 className='fst-italic text-primary'>Top headlines</h3>        
                    </div>
                    
                    <div className="col-12">
               <NewsCarousel news={topheadlines}/>
                    </div>
                </div>
            </div>
            <div className='hot-topics'>
                <div className="col-12">
                    <h3 className='fst-italic text-primary'>Hot topics</h3>   
                </div>
                
                {
                    Object.keys(hottopics).length == topics.length?
                    topics.map(topic =>
                    <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>{topic}</h3>   
                    </div>
                    <div className="row row-cols-3">
                        {
                           hottopics[topic].slice(0,15).map((nw)=><TopicsCard news={nw}/>)
                        }
                    </div>
                    <div className="col-12 mt-2">
                        <Link to={`/search?query=${topic}`} className="btn btn-primary">view more...</Link>
                    </div>
                    </div>
                    ):
                        <div className="d-flex justify-content-center">
                                 <Spinner className="text-success my-2" style={{ width: '4rem', height: '4rem' }}>
                                 <span className='visually-hidden'>Loading...</span>
                                </Spinner>
                        </div>
                       
                }

                </div>
        </div>
    }</>
}