import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';
import DashboardChat from './dashboard-chat';

const Chat = () => {
    return (
        <div id="body" className="grid-container">
           <DashboardHeader></DashboardHeader>
           <DashboardNav></DashboardNav>
           <DashboardChat></DashboardChat>
        </div>
    );
};

export default Chat;