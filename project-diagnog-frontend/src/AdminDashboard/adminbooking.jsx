import AdminSidebar from "./adminsidebar";
import AdminHeader from "./adminheader";
import AdminDashboardBooking from "./admindashboar-booking";


const Adminbooking = () => {
  return (
    <div className="grid-container">
    <AdminSidebar></AdminSidebar>
    <AdminHeader></AdminHeader>
    <AdminDashboardBooking></AdminDashboardBooking>
    </div>
  )
}

export default Adminbooking
