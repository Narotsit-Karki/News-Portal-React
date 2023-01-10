import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAlertMessage } from "../app/alertSlice"
import { NewsCard } from "../components/NewsCard"
import axios from "axios"
import { Link } from "react-router-dom"

export const Search = () => {
    const[news,setNews] = useState([])
    const [qs , setQs] = useSearchParams()
    let [empty,setEmpty] = useState(false)
    const dispatch = useDispatch();
    useEffect(()=>{
        setNews([])
        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/everything?q=${qs.get('query')}&language=en&apiKey=${import.meta.env.VITE_API_KEY}`
        ).then((resp) => {  
            if ( resp.data.articles.length == 0){
                setEmpty(true)
            }else{ 
                setNews(resp.data.articles)
                setEmpty(false)
            }

        }).catch((error) => {
            dispatch(setAlertMessage(
                {
                    message: 'Oh snap! Some error occurred',
                    alert_type: 'danger'
                }
            ))
        })
    },[qs])

    return<>
        {news.length == 0?
            empty?
            <div className="d-flex justify-content-center">
                <div className="text-primary m-5 fs-2" role="status">
                    No content found for {qs.get('query')} ... 
                </div>
            </div>
            :<div className="d-flex justify-content-center">
                <div className="spinner-border text-primary m-5" style={{width:'4rem',height:'4rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
            </div>
        
        :<>
        <div className="col-12 my-2">
        <button type="button" className="btn btn-outline-primary" disabled>
                {qs.get('query')} <span className="badge badge-danger bg-danger">{news.length}</span>
        </button>
        </div>
        <div className="row">
            
            { 
                news.map((nw) => {
                    return(
                        <div className="col-12">
                        <NewsCard news={nw}/>
                        </div>
                    )
                })
            }
        </div>
        </>
        }</>
}