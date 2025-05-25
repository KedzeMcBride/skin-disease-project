import AdminDashboardDoctor from "./admindashboard-doctor";
import AdminHeader from "./adminheader";
import AdminSidebar from "./adminsidebar";


const AdminDoctor = () => {
    return (
        <div className="grid-container">
        <AdminSidebar></AdminSidebar>
        <AdminHeader></AdminHeader>
        <AdminDashboardDoctor></AdminDashboardDoctor>
        </div>
    );
};

export default AdminDoctor;