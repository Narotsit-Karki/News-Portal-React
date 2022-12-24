import { useEffect,useState } from 'react'
import axios from 'axios'
import { NewsCarousel } from '../components/NewsCarousel'
import { useSelector } from 'react-redux'
export const Home = () => {
    let[news,setNews] = useState([])
    let country = useSelector(state => state.country.value)
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/top-headlines?country=${country}&apiKey=${import.meta.env.VITE_API_KEY}`).then(
            (resp) => {
                setNews(resp.data.articles)
            }
        ).catch((err)=>{
            console.log(err)
        })
    },[country])
    return <>
        <div className='row'>
            <div className="col-12 bg-primary">
                <h4 className='text text-center text-light fst-italic'>Top Headlines</h4>
            </div>
            <div className="col">
               <NewsCarousel news={news}/>
            </div>
        </div>
    </>
}