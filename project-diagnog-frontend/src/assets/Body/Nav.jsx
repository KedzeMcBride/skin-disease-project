// eslint-disable-next-line no-useless-escape
import logo from '../images/logo.png';
import upload from '../images/upload.png';
const Navbar = () => {
    return ( 
        <>
            <div className="nav">
                <img src={logo} alt="" className="logo" />
                <ul className="links">
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Contact</a></li>
                    <button className="upload"><img src={upload} alt="" className="cloud" /><a href="">Book Session</a></button>
                </ul>
            </div>
        </>
     );
}
 
export default Navbar;