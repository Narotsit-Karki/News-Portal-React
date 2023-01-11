import { Link } from "react-router-dom"
export const BlogCard = ({blog}) => {
    let date = new Date(blog.date)
    blog.date = date.toDateString()
    return <>
            <div className="col-12 mt-2">
            <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <img className="img-fluid" style={{'height':'300px','width':'300px', objectFit:'cover'}} src={blog.header_image}/>
                            </div>
                            <div className="col-8">
                                <h5 className="card-title text-primary">{blog.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted"><span className="text text-success">Author: </span>{blog.user.username}</h6>
                                <h6 className="card-subtitle mb-2 text-muted"><span className="text text-success">Published at: </span>{blog.date}</h6>
                                <div className="card-footer">
                                    <p className="card-text">{blog.description}</p>
                                </div>
                                <Link to={`/blog/${blog.slug}`} className="card-link text-decoration-none mt-2 btn btn-primary ">Read</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
           
    </>
}
export const BlogCardUser = ({blog}) => {
    let date = new Date(blog.date)
    blog.date = date.toDateString()
    return <>
            <div className="col-12 mt-2">
            <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <img className="img-fluid" style={{'height':'300px','width':'300px', objectFit:'cover'}} src={`${import.meta.env.VITE_SERVER_URL}${blog.header_image}`}/>
                            </div>
                            <div className="col-8">
                                <h5 className="card-title text-primary">{blog.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted"><span className="text text-success">Author: </span>{blog.user.username}</h6>
                                <h6 className="card-subtitle mb-2 text-muted"><span className="text text-success">Published at: </span>{blog.date}</h6>
                                <div className="card-footer">
                                    <p className="card-text">{blog.description}</p>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
           
    </>
}