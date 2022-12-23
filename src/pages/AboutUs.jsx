import logo from "../assets/icon/logo-128x128.png"
const  AboutUs = () => <div className="row">
        <div className="col-6 mx-auto my-3">
            <div className="row">
                <div className="col text-center text-primary">
                    <h1>About Us</h1>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <img src={logo}/>
                <p className="text text-primary fst-italic ms-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat quaerat reiciendis unde. Officia quod perferendis adipisci doloribus beatae repellat voluptate doloremque voluptates ut pariatur, eveniet reprehenderit quas similique tempore distinctio!
                </p>
                
            </div>
        </div>
        </div>

export default AboutUs