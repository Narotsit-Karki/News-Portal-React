import { useEffect,useState } from 'react'
import axios from 'axios'
import { NewsCarousel } from '../components/NewsCarousel'
export const Home = () => {
    let[news,setNews] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`).then(
            (resp) => {
                setNews(resp.data.articles)
            }
        ).catch((err)=>{
            console.log(err)
        })
    },[])
    return <>
        <div className='row'>
            <div className="col-12">
                <h1 className='text text-center text-primary fst-italic'>Top Headlines</h1>
            </div>
            <div className="col">
               <NewsCarousel news={news}/>
            </div>
        </div>
    </>
}