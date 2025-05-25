import  { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Plus,
  X,
  Save
} from 'lucide-react';

const AdminDashboardDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    experience: ''
  });
const [totalDoctors, setTotalDoctors] = useState(0);
const [activeDoctors, setActiveDoctors] = useState([]); // Add this state

  // Sample data
  useEffect(() => {
    axios.get('http://localhost:8081/admin/total-doctors')
      .then(res => setTotalDoctors(res.data.total))
      .catch(() => setTotalDoctors(0));

    axios.get('http://localhost:8081/admin/active-doctors')
      .then(res => setActiveDoctors(res.data.doctors))
      .catch(() => setActiveDoctors([]));

    setDoctors([
        { id: 1, name: 'Dr. Leah', specialty: 'Pediatric Dermatologist', email: 'leah@gmail.com', phone: '+237650518205', experience: '8 years', isActive: true },
        { id: 2, name: 'Dr. Vanessa', specialty: 'Cosmetic Dermatology', email: 'vanessa@gmail.com', phone: '+237677887677', experience: '10 years', isActive: false },
        { id: 3, name: 'Dr. Neba', specialty: 'Surgical Dermatologist', email: 'neba@gmail.com', phone: '+237672592733', experience: '12 years', isActive: true },
        { id: 4, name: 'Dr. Henry', specialty: 'Mohs Surgeon', email: 'henry@gmail.com', phone: '+237686542904', experience: '7 years', isActive: true }
        ]);

   axios.get('http://localhost:8081/admin/appointments')
    .then(res => setAppointments(res.data.appointments))
    .catch(() => setAppointments([]));
  }, []);



  const handleAddDoctor = () => {
    if (newDoctor.name && newDoctor.specialty && newDoctor.email) {
      const doctorToAdd = {
        id: doctors.length + 1,
        ...newDoctor,
        isActive: true
      };
      setDoctors([...doctors, doctorToAdd]);
      setNewDoctor({ name: '', specialty: '', email: '', phone: '', experience: '' });
      setShowAddForm(false);
    }
  };

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
    statsCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    statHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    statTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      margin: 0
    },
    statValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
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
    tabContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      borderBottom: '1px solid #e5e7eb'
    },
    tab: {
      padding: '12px 24px',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid transparent',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      color: '#6b7280',
      transition: 'all 0.2s ease'
    },
    activeTab: {
      color: '#3b82f6',
      borderBottomColor: '#3b82f6'
    },
    contentCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    addButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '20px',
      transition: 'background-color 0.2s ease'
    },
    doctorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px'
    },
    doctorCard: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    doctorName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    doctorInfo: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '4px 0'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: '500',
      marginTop: '8px'
    },
    activeStatus: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    inactiveStatus: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    appointmentCard: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      marginBottom: '16px'
    },
    appointmentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      width: '100%',
      maxWidth: '500px',
      margin: '20px'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '4px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end'
    },
    saveButton: {
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    cancelButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500'
    }
  };

  const renderAllDoctors = () => (
    <div style={styles.doctorGrid}>
      {doctors.map(doctor => (
        <div key={doctor.id} style={styles.doctorCard}>
          <h3 style={styles.doctorName}>{doctor.name}</h3>
          <p style={styles.doctorInfo}>Specialty: {doctor.specialty}</p>
          <p style={styles.doctorInfo}>Email: {doctor.email}</p>
          <p style={styles.doctorInfo}>Phone: {doctor.phone}</p>
          <p style={styles.doctorInfo}>Experience: {doctor.experience}</p>
          <span style={{
            ...styles.statusBadge,
            ...(doctor.isActive ? styles.activeStatus : styles.inactiveStatus)
          }}>
            {doctor.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      ))}
    </div>
  );

  const renderActiveDoctors = () => (
     <div style={styles.doctorGrid}>
    {activeDoctors.map(doctor => (
      <div key={doctor.id} style={styles.doctorCard}>
        <h3 style={styles.doctorName}>{doctor.Doctor_name}</h3>
        <p style={styles.doctorInfo}>Specialty: {doctor.specialty}</p>
        <p style={styles.doctorInfo}>Email: {doctor.email}</p>
        <p style={styles.doctorInfo}>Phone: {doctor.phone}</p>
        <p style={styles.doctorInfo}>Experience: {doctor.experience}</p>
        <span style={{...styles.statusBadge, ...styles.activeStatus}}>
          Available
        </span>
      </div>
    ))}
  </div>
  );

  const renderAppointments = () => (
    <div>
    {appointments.map(appointment => (
      <div key={appointment.id} style={styles.appointmentCard}>
        <div style={styles.appointmentHeader}>
          <h3 style={styles.doctorName}>{appointment.Doctor_name || 'Unknown Doctor'}</h3>
        </div>
        <p style={styles.doctorInfo}>Requested by: {appointment.user_name}</p>
        <p style={styles.doctorInfo}>Date: {appointment.appointment_date}</p>
      </div>
    ))}
    </div>
  );

  return (
    <div id="DashboardText-container">
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Doctors Management Dashboard</h1>
        <p style={styles.subtitle}>Manage doctors, view appointments and track activities</p>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsCards}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <h3 style={styles.statTitle}>Total Doctors</h3>
            <div style={{...styles.iconContainer, backgroundColor: '#dbeafe'}}>
              <Users size={24} color="#3b82f6" />
            </div>
          </div>
        <p style={styles.statValue}>{totalDoctors}</p>{/* fetching total doctors from the backend */}
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <h3 style={styles.statTitle}>Active Doctors</h3>
            <div style={{...styles.iconContainer, backgroundColor: '#d1fae5'}}>
              <UserCheck size={24} color="#10b981" />
            </div>
          </div>
          <p style={styles.statValue}>{activeDoctors.length}</p>{ /* fetching active doctors from the backend */}
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <h3 style={styles.statTitle}>Total Appointments</h3>
            <div style={{...styles.iconContainer, backgroundColor: '#fef3c7'}}>
              <Calendar size={24} color="#f59e0b" />
            </div>
          </div>
         <p style={styles.statValue}>{appointments.length}</p> {/* fetching total appointments from the backend */}
        </div>
      </div>

      {/* Add Doctor Button */}
      <button 
        style={styles.addButton}
        onClick={() => setShowAddForm(true)}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
      >
        <Plus size={20} />
        Add New Doctor
      </button>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'all' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('all')}
        >
          All Doctors
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'active' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('active')}
        >
          Active Doctors
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'appointments' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
      </div>

      {/* Content */}
      <div style={styles.contentCard}>
        {activeTab === 'all' && renderAllDoctors()}
        {activeTab === 'active' && renderActiveDoctors()}
        {activeTab === 'appointments' && renderAppointments()}
      </div>

      {/* Add Doctor Modal */}
      {showAddForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add New Doctor</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowAddForm(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                style={styles.input}
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                placeholder="Enter doctor's full name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Specialty</label>
              <input
                type="text"
                style={styles.input}
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                placeholder="Enter specialty"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                style={styles.input}
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="tel"
                style={styles.input}
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Experience</label>
              <input
                type="text"
                style={styles.input}
                value={newDoctor.experience}
                onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                placeholder="Enter years of experience"
              />
            </div>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.saveButton}
                onClick={handleAddDoctor}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
              >
                <Save size={16} />
                Save Doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>
  );
};

export default AdminDashboardDoctor;