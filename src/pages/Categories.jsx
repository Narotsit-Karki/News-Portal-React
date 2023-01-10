import { useParams } from "react-router";
import { useState,useEffect } from "react";
import axios from "axios";
import { NewsCard } from "../components/NewsCard";
import { setAlertMessage } from "../app/alertSlice";
import { useDispatch,useSelector } from "react-redux";
export const Category = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const country = useSelector(state => state.country.value)
    let [news,setNews] =useState([])
    let [empty,setEmpty] = useState(false)

    useEffect(() => {
        setNews([])

        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/top-headlines?language=en&country=${country}&category=${params.cat}&apiKey=${import.meta.env.VITE_API_KEY}`,{},{
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':true
            }
        }).then(
            (resp) => {
                
                if ( resp.data.articles.length == 0){
                    setEmpty(true)
                }else{ 
                    setNews(resp.data.articles)
                    setEmpty(false)
                }
            }
        ).catch(
            (err) => {
                console.log(err)
                dispatch(setAlertMessage(
                    {
                        message:'some error occurred',
                        alert_type:'danger'
                    }
                   
                ))
                
            }
            )
        },[params.cat,country]
        )

    return<>
        {news.length == 0?
            empty?
            <div className="d-flex justify-content-center">
                <div className="text-primary m-5 fs-2" role="status">
                    No news currently available ... 
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
                {params.cat} <span className="badge badge-danger bg-danger">{news.length}</span>
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