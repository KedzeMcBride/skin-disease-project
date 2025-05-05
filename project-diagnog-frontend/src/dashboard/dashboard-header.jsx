
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'

const DashboardHeader = () => {
    return (
       <header className='header'>
        <div className="menu-icon">
            <BsJustify className='icon' />
        </div>
        <div className="header-left">
            <BsSearch className='icon'/>
        </div>
        <div className="header-right">
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
       </header>
    );
};

export default DashboardHeader;