import  { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  UserCheck, 
  Activity, 
  UserMinus, 
  Stethoscope,
  Calendar
} from 'lucide-react';

const AdminUsers = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    usersUndergoingTreatment: 0,
    usersLeaving: 0,
    receivedAppointments: 0
  });
  const [appointmentIds, setAppointmentIds] = useState([]);

  // Fetching total users and other stats
useEffect(() => {
    axios.get('http://localhost:8081/admin/total-users')
      .then(res => {
        setStats(prev => ({
          ...prev,
          totalUsers: res.data.total
        }));
      })
      .catch(() => {
        // fallback or error handling
        setStats(prev => ({
          ...prev,
          totalUsers: 0
        }));
      });
// End of fetching total users
// Fetching active users and other stats
  axios.get('http://localhost:8081/admin/active-users')
    .then(res => {
      setStats(prev => ({
        ...prev,
        activeUsers: res.data.active
      }));
    })
    .catch(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: 0
      }));
    });


// Fetch users undergoing treatment
axios.get('http://localhost:8081/admin/users-undergoing-treatment')
.then(res => {
    setStats(prev => ({
    ...prev,
    usersUndergoingTreatment: res.data.total
    }));
    })
    .catch(() => {
      setStats(prev => ({
        ...prev,
        usersUndergoingTreatment: 0
      }));
    });

    // Fetch users leaving (not active)
axios.get('http://localhost:8081/admin/users-leaving')
  .then(res => {
    setStats(prev => ({
      ...prev,
      usersLeaving: res.data.leaving
    }));
  })
  .catch(() => {
    setStats(prev => ({
      ...prev,
      usersLeaving: 0
    }));
  });

  // Fetch all appointment IDs
    axios.get('http://localhost:8081/admin/appointment-ids')
      .then(res => {
        setAppointmentIds(res.data.ids);
        setStats(prev => ({
          ...prev,
          receivedAppointments: res.data.ids.length // update receivedAppointments count
        }));
      })
      .catch(() => {
        setAppointmentIds([]);
        setStats(prev => ({
          ...prev,
          receivedAppointments: 0
        }));
      });

setTimeout(() => {
      setStats(prev => ({
        ...prev,
      }));
    }, 500);
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: UserCheck,
      color: '#10b981',
      bgColor: '#d1fae5'
    },
    {
      title: 'Users Undergoing Treatment',
      value: stats.usersUndergoingTreatment,
      icon: Stethoscope,
      color: '#f59e0b',
      bgColor: '#fef3c7'
    },
    {
      title: 'Users Leaving',
      value: stats.usersLeaving,
      icon: UserMinus,
      color: '#ef4444',
      bgColor: '#fee2e2'
    },
    {
      title: 'Received Appointments',
      value: stats.receivedAppointments,
      icon: Calendar,
      color: '#8b5cf6',
      bgColor: '#ede9fe'
    }
  ];

  const styles = {
    container: {
      padding: '24px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0,
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      border: '1px solid #e5e7eb'
    },
    statCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    cardTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      margin: 0
    },
    iconContainer: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardValue: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0,
      lineHeight: '1'
    },
    cardChange: {
      marginTop: '8px',
      fontSize: '14px',
      color: '#10b981',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    summarySection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb'
    },
    summaryTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
      marginBottom: '16px'
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    summaryItem: {
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      textAlign: 'center'
    },
    summaryLabel: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0,
      marginBottom: '8px'
    },
    summaryValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    }
  };

  return (
    <div id="DashboardText-container">
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>User Analytics Dashboard</h1>
        <p style={styles.subtitle}>Track and monitor user statistics and activities</p>
      </div>

    <div style={styles.statsGrid}>
    {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
        <div
            key={index}
            style={styles.statCard}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = styles.statCardHover.transform;
            e.currentTarget.style.boxShadow = styles.statCardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = styles.statCard.boxShadow;
            }}
        >
            <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <div 
                style={{
                ...styles.iconContainer,
                backgroundColor: card.bgColor
                }}
            >
                <Icon size={24} color={card.color} />
            </div>
            </div>
            <div>
            <p style={styles.cardValue}>
                {card.value.toLocaleString()}
            </p>
            <div style={styles.cardChange}>
                <Activity size={16} />
                <span>+12% from last month</span>
            </div>
            {/* ADD THIS: Show appointment IDs for Received Appointments */}
            {card.title === 'Received Appointments' && appointmentIds.length > 0 && (
                <ul style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280', maxHeight: 100, overflowY: 'auto' }}>
                {appointmentIds.map(id => (
                    <li key={id}>Appointment ID: {id}</li>
                ))}
                </ul>
            )}
            </div>
        </div>
        );
    })}
    </div>

      <div style={styles.summarySection}>
        <h2 style={styles.summaryTitle}>Quick Summary</h2>
        <div style={styles.summaryGrid}>
          <div style={styles.summaryItem}>
            <p style={styles.summaryLabel}>Treatment Rate</p>
            <p style={styles.summaryValue}>
              {((stats.usersUndergoingTreatment / stats.totalUsers) * 100).toFixed(1)}%
            </p>
          </div>
          <div style={styles.summaryItem}>
            <p style={styles.summaryLabel}>Active Rate</p>
            <p style={styles.summaryValue}>
              {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
            </p>
          </div>
          <div style={styles.summaryItem}>
            <p style={styles.summaryLabel}>Churn Rate</p>
            <p style={styles.summaryValue}>
              {((stats.usersLeaving / stats.totalUsers) * 100).toFixed(1)}%
            </p>
          </div>
          <div style={styles.summaryItem}>
            <p style={styles.summaryLabel}>Appointment Ratio</p>
            <p style={styles.summaryValue}>
              {(stats.receivedAppointments / stats.activeUsers).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
</div>
  );
};

export default AdminUsers;