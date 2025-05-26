
import {BsFillBellFill} from 'react-icons/bs';
const AdminHeader = () => {
  const hasNotification = true;
  const styles = {
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px 32px',
      width: '100%',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    welcomeText: {
      fontSize: '14px',
      color: '#6b7280',
      padding: '5px 56px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      backgroundColor: '#3b82f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '600',
      fontSize: '14px',
      padding: '0 10px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    bell: {
      fontSize: '22px',
      color: '#3b82f6',
      cursor: 'pointer'
    }
  };
  return (
    <header className='header'>
      <div style={styles.container}>
        <h1 style={styles.title}>Dashboard</h1>
        <div style={styles.userSection}>
          <div style={styles.welcomeText}>
            Welcome, Admin
          </div>
          <div style={styles.avatar}>
            KM
          </div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <BsFillBellFill className='icon'/>
            {hasNotification && <span className="notification-dot"></span>}
          </div>
        </div>
        </div>
    </header>
  );
};

export default AdminHeader;