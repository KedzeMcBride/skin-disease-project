import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';
import DashboardSetting from './dashboard-setting';


const Setting = () => {
    return (
    <div id="body" className="grid-container">
        <DashboardHeader></DashboardHeader>
        <DashboardNav></DashboardNav>
        <DashboardSetting></DashboardSetting>
    </div>
    );
};

export default Setting;