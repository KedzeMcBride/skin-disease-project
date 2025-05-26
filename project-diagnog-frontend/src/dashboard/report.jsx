import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';
import DashboardReports from './dashboard-reports';


const ReportUser = () => {
    return (
        <div id="body" className="grid-container">
        <DashboardHeader></DashboardHeader>
        <DashboardNav></DashboardNav>
        <DashboardReports></DashboardReports>
        </div>
    );
};

export default ReportUser;