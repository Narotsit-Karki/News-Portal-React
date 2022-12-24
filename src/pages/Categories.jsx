import { useParams } from "react-router";
import { useState,useEffect } from "react";
import axios from "axios";
import { NewsCard } from "../components/NewsCard";
import { setAlertMessage } from "../app/alertSlice";
import { useDispatch } from "react-redux";
export const Category = () => {
    const params = useParams()
    const dispatch = useDispatch()
    
    let [news,setNews] =useState([])
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_NEWS_API_URL}/top-headlines?language=en&category=${params.cat}&apiKey=${import.meta.env.VITE_API_KEY}`,{},{
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':true
            }
        }).then(
            (resp) => {
                    setNews(resp.data.articles)
              
            }
        ).catch(
            (err) => {
                dispatch(setAlertMessage(
                    {
                        message:'some error occurred',
                        alert_type:'danger'
                    }
                   
                ))
                
            }
            )
        },[params.cat]
        )

    return<>
        {news.length == 0? 
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary m-5" style={{width:'4rem',height:'4rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        :<>
        <div className="col-12">
        <button type="button" class="btn btn-outline-primary" disabled>
                {params.cat} <span class="badge badge-danger bg-danger">{news.length}</span>
        </button>
        </div>
        <div className="row row-cols-2">
            
            { 
                news.map((nw) => {
                    return <NewsCard news={nw}/>
                })
            }
        </div>
        </>
        }</>
}