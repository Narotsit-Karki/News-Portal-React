import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


export const LoginRoute = ({children,location}) => {
    // const user = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        let user_local = JSON.parse(localStorage.getItem('user'))
        if(!user_local){
            navigate("/login")
        }else{
            navigate(location)
        }
    },[])
    return children
}


export const BlogRoute = ({children}) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login")
        }else{
            navigate("/create-blog")
        }
    },[isAuthenticated])
    return children
}
