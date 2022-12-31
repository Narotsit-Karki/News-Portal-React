import { useEffect,useState } from 'react'
import axios from 'axios'
import { NewsCarousel } from '../components/NewsCarousel'
import { useSelector } from 'react-redux'
import { TopicsCard } from '../components/HotTopicsCard'

import  Carousel  from 'react-bootstrap/Carousel'
import { TopicsCarousel } from '../components/TopicsCarousel'

export const Home = () => {
    let[topheadlines,setHeadlines] = useState([])
    let[cryptonews,setCrypto] = useState([])
    let[covidnews,setCovid] = useState([])
    let[sportnews,setSports] = useState([])
    let[ukrainenews,setUkraine] = useState([])
    let[localnews,setLocal] = useState([])

    let country = useSelector(state => state.country.value)
    
    useEffect(() => {
        setHeadlines([])


        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/top-headlines?country=${country}&apiKey=${import.meta.env.VITE_API_KEY}`).then(
            (resp) => {
                setHeadlines(resp.data.articles)
            }
        ).catch((err)=>{
            console.log(err)
        })

        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/everything?q=crypto&language=en&apiKey=${import.meta.env.VITE_API_KEY}`).then(
            (resp) => {
                setCrypto(resp.data.articles)
            }
        ).catch((err)=>{
            console.log(err)
        })
        
        
        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/everything?q=covid&language=en&apiKey=${import.meta.env.VITE_API_KEY}`).then(
            (resp) => {
                setCovid(resp.data.articles)
            }
        ).catch((err)=>{
            
        })

        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/everything?q=football&language=en&apiKey=${import.meta.env.VITE_API_KEY}`).then(
            (resp) => {
                setSports(resp.data.articles)
            }
        ).catch((err)=>{
            console.log(err)
        })

        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/everything?q=ukraine&language=en&apiKey=${import.meta.env.VITE_API_KEY}`).then(
            (resp) => {
                setUkraine(resp.data.articles)
            }
        ).catch((err)=>{
            console.log(err)
        })

        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/everything?q=nepal AND india AND china&language=en&apiKey=${import.meta.env.VITE_API_KEY}`).then(
            (resp) => {
                setLocal(resp.data.articles)
            }
        ).catch((err)=>{
            console.log(err)
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
            <div class="top-headlines">
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
                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Crypto</h3>   
                    </div>
                    <div className="col-12">
                        <TopicsCarousel topicnews={cryptonews}/>
                    </div>
                </div> 

                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Covid</h3>   
                    </div>
                    <div className="col-12">
                        <TopicsCarousel topicnews={covidnews}/>
                    </div>
    </div> 

                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Sports</h3>   
                    </div>
                    <div className="col-12">
                        <TopicsCarousel topicnews={sportnews}/>
                    </div>
                </div> 

                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Russia-Ukraine Conflict</h3>   
                    </div>
                    <div className="col-12">
                        <TopicsCarousel topicnews={ukrainenews}/>
                    </div>
                </div>
                
                <div className="topics rounded-top shadow">
                    <div className="col-12">
                         <h3 className='fst-italic text-sucess'>Near you</h3>   
                    </div>
                    <div className="col-12">
                        <TopicsCarousel topicnews={localnews}/>
                    </div>
                </div>
            </div>
        </div>
    }</>
}