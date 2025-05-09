import DashboardDiagnose from './dashboard-diagnose';
import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';
const Diagnose = () => {
    return (
        <div id="body" className="grid-container">
        <DashboardHeader></DashboardHeader>
        <DashboardNav></DashboardNav>
        <DashboardDiagnose></DashboardDiagnose>
        </div>
    );
};

export default Diagnose;