import { useState } from "react";
import { useNavigate } from "react-router";

export const SearchForm = () =>{
    const navigate = useNavigate();
    let [query , setSearch] = useState('');
    
    const handleSubmit = ()=>{
      navigate(`/search?query=${query}`)
    }
    return <>
     <div className="input-group">
                <input className="form-control" placeholder="Search topics and more ..." onInput={(e) => setSearch(e.target.value)}/>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    <i className="fa-solid fa-search"></i>
                </button>
            </div>
    </>
}
