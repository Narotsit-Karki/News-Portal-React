import { BrowserRouter, Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import {BaseLayout} from "./pages/BaseLayout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blogs";
import { Category } from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { Error404 } from "./pages/DefaultPages";
import { LoginRoute } from "./PrivateRoutes";
export const SiteRoute = () => {
   
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route path="/login" element={<LoginRoute><Login/></LoginRoute>}/>
                    <Route path="/join" element={<Signup/>}/>
                    <Route path="/blogs" element={<Blog/>}/>
                    <Route path="/category/:cat" element = {<Category/>}/>
                </Route>
                <Route path="*" element={<BaseLayout/>}>
                    <Route path="*" element={<Error404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    </>
}   