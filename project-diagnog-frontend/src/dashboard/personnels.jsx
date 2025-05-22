import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';
import DashboardPersonnels from './dashboard-personnels';
const Personnels = () => {
    return (
     <div id="body" className="grid-container">
        <DashboardHeader></DashboardHeader>
        <DashboardNav></DashboardNav>
        <DashboardPersonnels></DashboardPersonnels>
    </div>
    );
};

export default Personnels;