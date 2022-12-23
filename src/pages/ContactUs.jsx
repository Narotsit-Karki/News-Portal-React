import logo from "../assets/icon/logo-128x128.png"
const  ContactUs = () => <div className="row">
        <div className="col-6 mx-auto my-3">
            <div className="row">
                <div className="col text-center text-primary">
                    <h1>Contact Us</h1>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <img src={logo}/>
                <div className="row ms-2">
                    <div className="col-12">
                        <strong><i className="fa-solid fa-phone"></i> Phone no:</strong> 9840412346 / 9840418556
                    </div>
                    <div className="col-12">
                        <strong><i className="fa-solid fa-building"></i> Office:</strong> 4431038 / 4457123
                    </div>
                    <div className="col-12">
                    <strong> <i className="fa-solid fa-envelope"></i> Email: </strong>
                    <a href="mailto:ajaxnews@gmail.com" className="text-decoration-none text-primary"> ajaxnews@gmail.com</a>
             
                    </div>
                </div>
                
            </div>
        </div>
        </div>

export default ContactUs