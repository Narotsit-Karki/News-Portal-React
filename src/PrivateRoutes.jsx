import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
export const LoginRoute = ({children}) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login")
        }else{
            navigate("/")
        }
    },[isAuthenticated])
    return children
}
