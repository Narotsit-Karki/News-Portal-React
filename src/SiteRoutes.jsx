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
import { BlogDetail } from "./pages/BlogDetail";
import { CreateBlog } from "./pages/CreateBlog";
import { NewsDetail } from "./pages/NewsDetails";
import { Accounts } from "./pages/Accounts";
import { Search } from "./pages/Search";
import { EditBlog } from "./pages/EditBlog";

export const SiteRoute = () => {
   
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route path="/login" element={<LoginRoute location="/"><Login/></LoginRoute>}/>
                    <Route path="/join" element={<Signup/>}/>
                    <Route path="/accounts" element={<LoginRoute location="/accounts"><Accounts/></LoginRoute>}/>
                    <Route path="news-detail" element={<NewsDetail/>}/>
                    <Route path="/blogs/" element={<Blog/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/blog/:slug" element={<BlogDetail/>}/>    
                    <Route path="/category/:cat" element = {<Category/>}/>
                    <Route path="/create-blog" element={<LoginRoute location="/create-blog"><CreateBlog/></LoginRoute>}/>
                    <Route path="/edit-blog" element={<EditBlog/>}/>
                </Route>
                <Route path="*" element={<BaseLayout/>}>
                    <Route path="*" element={<Error404/>}/>
                </Route>
            </Routes>
        </BrowserRouter> 

    </>
}   