import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plus, 
  X,
  Check,
  Phone,
  ChevronLeft,
  ChevronRight,

} from 'lucide-react';

const AdminDashboardBooking = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);
  
  // Filter states
  const [filters, setFilters] = useState({
    status: 'all',
    doctor: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });

  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
    doctor: '',
    complaint: '',
    notes: ''
  });

  // Sample data
    useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/appointments');
        if (!response.ok) {
          console.error('Failed to fetch appointments');
          return;
        }
        const data = await response.json();
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
    }, []);
  // Filter and sort appointments
  useEffect(() => {
    let filtered = [...appointments];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(apt => apt.status.toLowerCase() === filters.status);
    }

    // Filter by doctor
    if (filters.doctor !== 'all') {
      filtered = filtered.filter(apt => apt.doctor === filters.doctor);
    }

    // Sort appointments
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'alphabetical':
          return a.patientName.localeCompare(b.patientName);
        case 'upcoming':
          return new Date(a.date) - new Date(b.date);
        default:
          return 0;
      }
    });

    setFilteredAppointments(filtered);
    setCurrentPage(1);
  }, [filters, appointments]);

const handleStatusChange = async (appointmentId, newStatus) => {
  try {
    const response = await fetch(`http://localhost:8081/appointments/${appointmentId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!response.ok) throw new Error("Failed to update status");
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  } catch (err) {
    console.error("Status update error:", err);
  }
};

  const handleCreateAppointment = () => {
    if (newAppointment.patientName && newAppointment.date && newAppointment.time && newAppointment.doctor) {
      const appointment = {
        id: appointments.length + 1,
        ...newAppointment,
        status: 'Pending',
        patientAge: 30,
        history: 'No history available',
        attachments: []
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment({
        patientName: '',
        date: '',
        time: '',
        doctor: '',
        complaint: '',
        notes: ''
      });
      setShowCreateForm(false);
    }
  };

  // Pagination
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const styles = {
    container: {
      padding: '24px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    createButton: {
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
      transition: 'background-color 0.2s ease'
    },
    filtersContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    filtersRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      alignItems: 'center'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    filterLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    select: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white'
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    thead: {
      backgroundColor: '#f9fafb'
    },
    th: {
      padding: '16px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb'
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #f3f4f6',
      fontSize: '14px',
      color: '#374151'
    },
    tr: {
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    trHover: {
      backgroundColor: '#f9fafb'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: '500',
      textAlign: 'center',
      display: 'inline-block'
    },
    pendingStatus: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    confirmedStatus: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    cancelledStatus: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    completedStatus: {
      backgroundColor: '#e0e7ff',
      color: '#3730a3'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'background-color 0.2s ease'
    },
    acceptButton: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    cancelButton: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    rescheduleButton: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    callButton: {
      backgroundColor: '#e0e7ff',
      color: '#3730a3'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '24px'
    },
    pageButton: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      backgroundColor: 'white',
      cursor: 'pointer',
      borderRadius: '6px',
      fontSize: '14px'
    },
    activePageButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6'
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
      maxWidth: '600px',
      maxHeight: '90vh',
      overflow: 'auto',
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
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
      minHeight: '100px',
      resize: 'vertical'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '24px'
    },
    saveButton: {
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500'
    },
    cancelFormButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500'
    },
    detailsSection: {
      marginBottom: '20px'
    },
    detailsTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '12px'
    },
    detailsText: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '8px'
    },
    attachmentsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px'
    },
    attachmentItem: {
      padding: '4px 8px',
      backgroundColor: '#f3f4f6',
      borderRadius: '4px',
      fontSize: '12px',
      color: '#374151'
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { ...styles.statusBadge, ...styles.pendingStatus };
      case 'confirmed':
        return { ...styles.statusBadge, ...styles.confirmedStatus };
      case 'cancelled':
        return { ...styles.statusBadge, ...styles.cancelledStatus };
      case 'completed':
        return { ...styles.statusBadge, ...styles.completedStatus };
      default:
        return styles.statusBadge;
    }
  };

  const renderActionButtons = (appointment) => {
    if (appointment.status === 'Pending') {
      return (
        <div style={styles.actionButtons}>
          <button
            style={{ ...styles.actionButton, ...styles.acceptButton }}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(appointment.id, 'Confirmed');
            }}
          >
            <Check size={14} />
            Accept
          </button>
          <button
            style={{ ...styles.actionButton, ...styles.cancelButton }}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(appointment.id, 'Cancelled');
            }}
          >
            <X size={14} />
            Cancel
          </button>
        </div>
      );
    } else if (appointment.status === 'Confirmed') {
      return (
        <div style={styles.actionButtons}>
          <button
            style={{ ...styles.actionButton, ...styles.rescheduleButton }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar size={14} />
            Reschedule
          </button>
          <button
            style={{ ...styles.actionButton, ...styles.callButton }}
            onClick={(e) => e.stopPropagation()}
          >
            <Phone size={14} />
            Call
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="DashboardText-container">
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Appointment Management</h1>
        <button
          style={styles.createButton}
          onClick={() => setShowCreateForm(true)}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          <Plus size={20} />
          Create New Appointment
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filtersContainer}>
        <div style={styles.filtersRow}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Status</label>
            <select
              style={styles.select}
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Doctor</label>
            <select
              style={styles.select}
              value={filters.doctor}
              onChange={(e) => setFilters({ ...filters, doctor: e.target.value })}
            >
              <option value="all">All Doctors</option>
              <option value="Dr. Lee">Dr. Lee</option>
              <option value="Dr. Mike">Dr. Mike</option>
              <option value="Dr. Sarah">Dr. Sarah</option>
              <option value="Dr. Brown">Dr. Brown</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Sort By</label>
            <select
              style={styles.select}
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="newest">Newest</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="upcoming">Upcoming Soonest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Date & Time</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Doctor</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                style={styles.tr}
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setShowDetailsModal(true);
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.trHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <td style={styles.td}>{appointment.patientName}</td>
                <td style={styles.td}>
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })} @ {new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </td>
                <td style={styles.td}>
                  <span style={getStatusStyle(appointment.status)}>
                    {appointment.status}
                  </span>
                </td>
                <td style={styles.td}>{appointment.doctor}</td>
                <td style={styles.td}>
                  {renderActionButtons(appointment)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.pageButton}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            style={{
              ...styles.pageButton,
              ...(currentPage === index + 1 ? styles.activePageButton : {})
            }}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          style={styles.pageButton}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Create Appointment Modal */}
      {showCreateForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Appointment</h2>
              <button
                style={styles.closeButton}
                onClick={() => setShowCreateForm(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Patient Name</label>
              <input
                type="text"
                style={styles.input}
                value={newAppointment.patientName}
                onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                placeholder="Enter patient name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                style={styles.input}
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Time</label>
              <input
                type="time"
                style={styles.input}
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Doctor</label>
              <select
                style={styles.input}
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Lee">Dr. Lee</option>
                <option value="Dr. Mike">Dr. Mike</option>
                <option value="Dr. Sarah">Dr. Sarah</option>
                <option value="Dr. Brown">Dr. Brown</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Complaint/Reason</label>
              <input
                type="text"
                style={styles.input}
                value={newAppointment.complaint}
                onChange={(e) => setNewAppointment({ ...newAppointment, complaint: e.target.value })}
                placeholder="Enter complaint or reason for visit"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Notes</label>
              <textarea
                style={styles.textarea}
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                placeholder="Additional notes"
              />
            </div>

            <div style={styles.buttonGroup}>
              <button
                style={styles.cancelFormButton}
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
              <button
                style={styles.saveButton}
                onClick={handleCreateAppointment}
              >
                Create Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Appointment Details</h2>
              <button
                style={styles.closeButton}
                onClick={() => setShowDetailsModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div style={styles.detailsSection}>
              <h3 style={styles.detailsTitle}>Patient Information</h3>
              <p style={styles.detailsText}>Name: {selectedAppointment.patientName}</p>
              <p style={styles.detailsText}>Age: {selectedAppointment.patientAge}</p>
              <p style={styles.detailsText}>Medical History: {selectedAppointment.history}</p>
            </div>

            <div style={styles.detailsSection}>
              <h3 style={styles.detailsTitle}>Appointment Details</h3>
              <p style={styles.detailsText}>Date: {new Date(selectedAppointment.date).toLocaleDateString()}</p>
              <p style={styles.detailsText}>Time: {selectedAppointment.time}</p>
              <p style={styles.detailsText}>Doctor: {selectedAppointment.doctor}</p>
              <p style={styles.detailsText}>Status: <span style={getStatusStyle(selectedAppointment.status)}>{selectedAppointment.status}</span></p>
            </div>

            <div style={styles.detailsSection}>
              <h3 style={styles.detailsTitle}>Complaint & Notes</h3>
              <p style={styles.detailsText}>Complaint: {selectedAppointment.complaint}</p>
              <p style={styles.detailsText}>Notes: {selectedAppointment.notes}</p>
            </div>

            {selectedAppointment.attachments && selectedAppointment.attachments.length > 0 && (
              <div style={styles.detailsSection}>
                <h3 style={styles.detailsTitle}>Attachments</h3>
                <div style={styles.attachmentsList}>
                  {selectedAppointment.attachments.map((attachment, index) => (
                    <span key={index} style={styles.attachmentItem}>
                      {attachment}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={styles.buttonGroup}>
              <button style={styles.cancelFormButton}>
                Cancel Appointment
              </button>
              <button style={styles.saveButton}>
                Approve Appointment
              </button>
              <button style={{ ...styles.saveButton, backgroundColor: '#3b82f6' }}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>
  );
};

export default AdminDashboardBooking;