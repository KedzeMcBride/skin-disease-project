import { Users, UserCheck, Calendar, CalendarCheck, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigationItems = [
  { id: 'patients', label: 'Patients', icon: Users, to: '/admin/patients' },
  { id: 'doctors', label: 'Doctors', icon: UserCheck, to: '/admin/doctors' },
  { id: 'sent-bookings', label: 'Sent Bookings', icon: Calendar, to: '/admin/sent-bookings' },
  { id: 'assigned-bookings', label: 'Bookings Assigned', icon: CalendarCheck, to: '/admin/assigned-bookings' },
];

const AdminSidebar = () => {
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="admin-sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                `admin-sidebar-btn${isActive ? ' active' : ''}`
              }
              end
            >
              <Icon size={20} className="admin-sidebar-icon" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="admin-sidebar-logout">
        <button
          onClick={handleLogout}
          className="admin-sidebar-btn logout"
        >
          <LogOut size={20} className="admin-sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;