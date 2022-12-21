import { BrowserRouter, Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import {BaseLayout} from "./pages/BaseLayout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";


export const SiteRoute = () => {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/join" element={<Signup/>}/>
                    
                </Route>
            </Routes>
        </BrowserRouter>

    </>
}   