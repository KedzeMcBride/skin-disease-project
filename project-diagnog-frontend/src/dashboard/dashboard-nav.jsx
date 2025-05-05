import { BsChatDots,BsGearFill,BsBarChartFill} from 'react-icons/bs';
import { BsPeopleFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
import { FaStethoscope, FaCheckCircle } from 'react-icons/fa';
//import { FiLogOut } from 'react-icons/fi';
import logo from '../assets/images/logo.png'; // Corrected logo import
  
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
                <a href="">Dashboard</a>    
                </li>
                <li className="sidebar-list-item">
                <FaStethoscope className='icon'/>
                <a href="">Diagnostic</a>
                </li>
                <li className="sidebar-list-item">
                <FaCheckCircle className='icon'/>
                <a href="">Results</a>
                </li>
                <li className="sidebar-list-item">
                <BsPeopleFill className='icon'/>
                <a href="">Available Personnels</a>   
                </li>
                <li className="sidebar-list-item">
                <BsChatDots className='icon'/>
                <a href="">Chat</a>
                </li>
                <li className="sidebar-list-item">
                <BsGearFill className='icon'/>
                <a href="">Settings</a>
                </li>
                <li className="sidebar-list-item">
                <BsBarChartFill className='icon'/>
                <a href="">Reports</a>
                </li>
            </ul>
        </aside>
    );
};

export default DashboardNav;