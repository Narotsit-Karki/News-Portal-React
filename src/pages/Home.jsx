import { useEffect,useState } from 'react'
import axios from 'axios'
import { NewsCarousel } from '../components/NewsCarousel'
import { useDispatch, useSelector } from 'react-redux'
import { TopicsCard } from '../components/HotTopicsCard'
import { Link } from 'react-router-dom'
import { setAlertMessage } from '../app/alertSlice'

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
                    ):''
                }

                  {/* <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Crypto</h3>   
                    </div>
                    <div className="row row-cols-3">
                        
                        {
                            cryptonews.slice(0,15).map((nw)=><TopicsCard news={nw}/>) 
                        }
                    </div>
                    <div className="col-12 mt-2">
                        <Link to='/search?query=covid' className="btn btn-primary">view more...</Link>
                    </div>
                </div> 

                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Covid</h3>   
                    </div>
                    <div className="row row-cols-3">
                        
                        {
                            covidnews.slice(0,15).map((nw)=><TopicsCard news={nw}/>) 
                        }
                    </div>
                    <div className="col-12 mt-2">
                        <Link to='/search?query=covid' className="btn btn-primary">view more...</Link>
                    </div>
                </div> 

                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Sports</h3>   
                    </div>
                    <div className="row row-cols-3">
                        
                        {
                            sportsnews.slice(0,15).map((nw)=><TopicsCard news={nw}/>) 
                        }
                    </div>
                    <div className="col-12 mt-2">
                        <Link to='/search?query=sports' className="btn btn-primary">view more...</Link>
                    </div>
                </div> 

                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Russia-Ukraine Conflict</h3>   
                    </div>
                    <div className="row row-cols-3">
                        
                        {
                            ukrainenews.slice(0,15).map((nw)=><TopicsCard news={nw}/>) 
                        }
                    </div>
                    <div className="col-12 mt-2">
                        <Link to='/search?query=ukraine conflict' className="btn btn-primary">view more...</Link>
                    </div>
                </div>

                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Local</h3>   
                    </div>
                    <div className="row row-cols-3">
                        
                        {
                            localnews.slice(0,15).map((nw)=><TopicsCard news={nw}/>) 
                        }
                    </div>
                    <div className="col-12 mt-2">
                        <Link to='/search?query=Nepal AND India AND China' className="btn btn-primary">view more...</Link>
                    </div>
                </div> */}
            
            </div>
        </div>
    }</>
}