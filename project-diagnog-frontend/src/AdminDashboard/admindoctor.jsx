import AdminHeader from "./adminheader";
import AdminSidebar from "./adminsidebar";


const AdminDoctor = () => {
    return (
        <div className="grid-container">
        <AdminSidebar></AdminSidebar>
        <AdminHeader></AdminHeader>
        </div>
    );
};

export default AdminDoctor;