import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';
import DashboardProfile from './dashboard-profile';

const Chat = () => {
    return (
        <div id="body" className="grid-container">
           <DashboardHeader></DashboardHeader>
           <DashboardNav></DashboardNav>
           <DashboardProfile></DashboardProfile>
        </div>
    );
};

export default Chat;