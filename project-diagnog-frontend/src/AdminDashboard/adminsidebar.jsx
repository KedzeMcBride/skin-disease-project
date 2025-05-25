import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { 
  Users, 
  UserCheck, 
  Calendar, 
  CalendarCheck, 
  LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const [activeSection, setActiveSection] = useState('patients');
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'patients', label: 'Patients', icon: Users, route: '/admindashboard' },
    { id: 'doctors', label: 'Doctors', icon: UserCheck, route: '/admindoctor' },
    { id: 'sent-bookings', label: 'Sent Bookings', icon: Calendar },
    { id: 'assigned-bookings', label: 'Bookings Assigned', icon: CalendarCheck },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  const styles = {
    sidebar: {
      width: '256px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      height: '100vh',
      position: 'relative'
    },
    header: {
      padding: '16px',
      borderBottom: '1px solid #e5e7eb',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '20px',
      color: '#1f2937',
      margin: 0
    },
    nav: {
      marginTop: '32px'
    },
    navButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      textAlign: 'left',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      color: '#374151',
      fontSize: '16px'
    },
    navButtonHover: {
      backgroundColor: '#f9fafb'
    },
    navButtonActive: {
      backgroundColor: '#dbeafe',
      borderRight: '4px solid #3b82f6',
      color: '#2563eb'
    },
    icon: {
      marginRight: '12px'
    },
    logoutContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%'
    },
    logoutButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      textAlign: 'left',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      color: '#dc2626',
      borderTop: '1px solid #e5e7eb',
      fontSize: '16px'
    },
    logoutButtonHover: {
      backgroundColor: '#fef2f2'
    }
  };

  return (
    <aside id="sidebar"> 
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={styles.title}>Admin Panel</h2>
      </div>
      
      <nav style={styles.nav}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {setActiveSection(item.id);
              if (item.route) navigate(item.route);
              }}
              style={{
                ...styles.navButton,
                ...(isActive ? styles.navButtonActive : {})
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = styles.navButtonHover.backgroundColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon size={20} style={styles.icon} />
              <span>{item.label}</span>
            </button>
          );
        })}
        
        {/* Logout Button */}
        <div style={styles.logoutContainer}>
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <LogOut size={20} style={styles.icon} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  </aside>
  );
};

export default AdminSidebar;