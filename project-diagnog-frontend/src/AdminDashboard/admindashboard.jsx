import AdminHeader from "./adminheader";
import AdminSidebar from "./adminsidebar";
import AdminUsers from "./adminusers";

const AdminDashboard = () => {
    return (
        <div id="" className="grid-container">
        <AdminSidebar></AdminSidebar>
        <AdminHeader></AdminHeader>
        <AdminUsers></AdminUsers>
        </div>
    );
};

export default AdminDashboard;