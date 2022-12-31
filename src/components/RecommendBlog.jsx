import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

export const RecommendBlog = ({blog}) => {
    let date = new Date(blog.date)
    blog.date = date.toDateString()
    return <>
     
    <div className="col-12 recommended-card shadow">
        <div className="row">
            <div className="col-4">
                <img src={`${blog.header_image}`} className="img-fluid" style={{height:'300px',objectFit:'cover'}}/>
            </div>
            <div className="col-8">
                <div className="col-12">
                    <div className="fst-italic h3">
                        {blog.title}
                    </div>
                    <h5 className="text text-primary">
                        Author: <label className="text text-muted">{blog.user.username}</label>
                    </h5>
                    <h5 className="text text-primary">
                        Published: <label className="text text-muted">{blog.date}</label>
                    </h5>
                </div>
                <div className="col-12">
                    <p className="fst-italic truncate">
                        {blog.description}
                    </p>
                </div>
                <div className="col-12">
                    <a href={`/blog/${blog.slug}`} className='text-decoration-none'> continue reading ...</a>
                </div>
            </div>
        </div>
    </div>
    </>
}