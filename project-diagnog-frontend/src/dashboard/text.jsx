import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';
import DashboardText from './dashboard-text';


const Text = () => {
    return (
        <div id="body" className="grid-container">
          <DashboardHeader></DashboardHeader>
          <DashboardNav></DashboardNav>
          <DashboardText></DashboardText>
        </div>
    );
};

export default Text;