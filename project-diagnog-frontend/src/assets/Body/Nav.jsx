// eslint-disable-next-line no-useless-escape
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import upload from '../images/upload.png';
const Navbar = () => {
    return ( 
        <>
            <div className="nav">
                <img src={logo} alt="" className="logo" />
                <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                    <label htmlFor="nav-toggle" className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                <ul className="links">
                    <li><Link to="/home">Home</Link></li>
                    <li><a href="">About</a></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <button className="upload"><img src={upload} alt="" className="cloud" /><a href="">Book Session</a></button>
                </ul>
            </div>
        </>
     );
}
 
export default Navbar;