import { BsChatDots,BsGearFill,BsBarChartFill} from 'react-icons/bs';
import { BsPeopleFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
import { FaStethoscope, FaCheckCircle } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
//import { FiLogOut } from 'react-icons/fi';
import logo from '../assets/images/logo.png'; // Corrected logo import
import { Link } from 'react-router-dom';


const DashboardNav = () => {
    return (
        <aside id="sidebar"> 
            <div className="sidebar-title">
                <div className="sidebar-brand">
                <div className='logo-name'>
                <img src={logo} alt="" /><h3>DiagNog</h3>
                </div>
                </div>
                <span className="close-icon">X</span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                <MdDashboard className='icon'/>
                <Link to="/chat">Dashboard</Link>    
                </li>
                <li className="sidebar-list-item">
                <FaStethoscope className='icon'/>
                <Link to="/diagnose">Diagnostic</Link>
                </li>
                <li className="sidebar-list-item">
                <FaCheckCircle className='icon'/>
                <a href="">Results</a>
                </li>
                <li className="sidebar-list-item">
                <BsPeopleFill className='icon'/>
                <Link to="/personnels">Available Personnels</Link>   
                </li>
                <li className="sidebar-list-item">
                <BsChatDots className='icon'/>
                <Link to="/text">Chat</Link>
                </li>
                <li className="sidebar-list-item">
                <BsGearFill className='icon'/>
                <Link to="/setting">Settings</Link>
                </li>
                <li className="sidebar-list-item">
                <BsBarChartFill className='icon'/>
                <Link to="/reports">Reports</Link>
                </li>
                <li className="sidebar-list-i">
                <BsArrowLeft className='icon'/>
                <Link to="/landing">Return</Link>
                </li>
            </ul>
        </aside>
    );
};

export default DashboardNav;