import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAlertMessage } from "../app/alertSlice"
import axios from "axios";
import { remove } from "../app/userSlice";
export const Logout = ({token}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        let auth_headers = {
            Authorization: `Token ${token}`
        }
        axios.post(`${import.meta.env.VITE_API_URL}/logout/`,{},{
           headers: auth_headers
        }).then(
            (resp) => {

                if(resp.status == 204){
                    localStorage.removeItem('user')
                    dispatch(remove())
                   
                    dispatch(setAlertMessage(
                        {
                            message:'logged out',
                            alert_type:'info'
                        }
                    ))
                    navigate('/login');
                }
            }
        ).catch(
            (err) => {
                
                dispatch(setAlertMessage(
                    {
                        message: 'Some error occurred',
                        alert_type: 'danger'
                    }
                    ))}
        )
    }
    
    return <button className="dropdown-item" to="#" onClick={logout}><i className="fa-solid fa-sign-out text-danger"></i> Logout</button>
}