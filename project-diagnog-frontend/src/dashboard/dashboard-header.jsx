
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'

const DashboardHeader = () => {
    const hasNotification = true;

    return (
       <header className='header'>
        <div className="menu-icon">
            <BsJustify className='icon' />
        </div>
        <div className="header-left">
            <BsSearch className='icon'/>
        </div>
       <div className="header-right">
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <BsFillBellFill className='icon'/>
                {hasNotification && <span className="notification-dot"></span>}
            </div>
             <div style={{ position: 'relative', display: 'inline-block' }}>
                <BsFillEnvelopeFill className='icon'/>
                {hasNotification && <span className="notification-dot"></span>}
            </div>
            <BsPersonCircle className='icon'/>
        </div>
       </header>
    );
};

export default DashboardHeader;