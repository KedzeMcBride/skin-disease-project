
import { Clock, User, Stethoscope, Calendar } from 'lucide-react';

const DashboardPersonnels = () => {
  // Sample data for four medical personnel
  const medicalPersonnel = [
    {
      id: 1,
      name: "Dr. Leah",
      specialty: "Cardiology",
      availability: "Available",
      schedule: "Mon-Fri: 9:00 AM - 5:00 PM",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Dr. Vanessa",
      specialty: "Dermatology", 
      availability: "Unavailable",
      schedule: "Mon-Tue: 10:00 AM - 4:00 PM",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Dr. Neba",
      specialty: "Pediatrics",
      availability: "Available",
      schedule: "Wed-Fri: 8:00 AM - 3:00 PM",
      image: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "Dr. Henry",
      specialty: "Orthopedics",
      availability: "Available", 
      schedule: "Mon-Thu: 11:00 AM - 6:00 PM",
      image: "/api/placeholder/80/80"
    }
  ];

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
      marginTop: '24px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '24px',
      border: '1px solid #e9ecef',
      transition: 'box-shadow 0.3s ease'
    },
    cardHover: {
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
    },
    profileSection: {
      textAlign: 'center',
      marginBottom: '16px'
    },
    profileImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      margin: '0 auto 12px',
      objectFit: 'cover',
      border: '4px solid #e3f2fd',
      display: 'block'
    },
    doctorName: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#212529',
      margin: '0 0 4px 0'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      color: '#495057'
    },
    infoRowBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px',
      color: '#495057'
    },
    infoRowStart: {
      display: 'flex',
      alignItems: 'flex-start',
      color: '#495057'
    },
    icon: {
      width: '16px',
      height: '16px',
      marginRight: '8px',
      color: '#2196f3',
      flexShrink: 0
    },
    iconTop: {
      width: '16px',
      height: '16px',
      marginRight: '8px',
      color: '#2196f3',
      marginTop: '2px',
      flexShrink: 0
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    value: {
      fontSize: '0.875rem',
      marginLeft: '8px'
    },
    scheduleValue: {
      fontSize: '0.875rem',
      marginTop: '4px',
      lineHeight: '1.4'
    },
    statusBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    statusAvailable: {
      backgroundColor: '#d4edda',
      color: '#155724'
    },
    statusUnavailable: {
      backgroundColor: '#f8d7da',
      color: '#721c24'
    },
    buttonSection: {
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid #e9ecef'
    },
    button: {
      width: '100%',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    buttonAvailable: {
      backgroundColor: '#2196f3',
      color: 'white'
    },
    buttonAvailableHover: {
      backgroundColor: '#1976d2'
    },
    buttonUnavailable: {
      backgroundColor: '#e9ecef',
      color: '#6c757d',
      cursor: 'not-allowed'
    },
    footer: {
      textAlign: 'center',
      marginTop: '32px'
    },
    footerInfo: {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#6c757d',
      fontSize: '0.875rem'
    },
    footerIcon: {
      width: '16px',
      height: '16px',
      marginRight: '8px'
    }
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, styles.cardHover);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = styles.card.boxShadow;
  };

  const handleButtonHover = (e, isAvailable) => {
    if (isAvailable) {
      e.currentTarget.style.backgroundColor = styles.buttonAvailableHover.backgroundColor;
    }
  };

  const handleButtonLeave = (e, isAvailable) => {
    if (isAvailable) {
      e.currentTarget.style.backgroundColor = styles.buttonAvailable.backgroundColor;
    }
  };

  return (
    <div id="DashboardText-container">
    <div className="text-title"><h1>Personnels Info</h1></div>
    <div style={styles.container}>
      {/* Header */}
      {/* Personnel Grid */}
      <div style={styles.grid}>
        {medicalPersonnel.map((person) => (
          <div 
            key={person.id}
            style={styles.card}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Profile Image and Name */}
            <div style={styles.profileSection}>
              <img 
                src={person.image}
                alt={person.name}
                style={styles.profileImage}
              />
              <h3 style={styles.doctorName}>{person.name}</h3>
            </div>

            {/* Specialty */}
            <div style={styles.infoRow}>
              <Stethoscope style={styles.icon} />
              <span style={styles.label}>Specialty:</span>
              <span style={styles.value}>{person.specialty}</span>
            </div>

            {/* Availability Status */}
            <div style={styles.infoRowBetween}>
              <div style={styles.infoRow}>
                <User style={styles.icon} />
                <span style={styles.label}>Status:</span>
              </div>
              <span 
                style={{
                  ...styles.statusBadge,
                  ...(person.availability === "Available" 
                    ? styles.statusAvailable 
                    : styles.statusUnavailable)
                }}
              >
                {person.availability}
              </span>
            </div>

            {/* Schedule */}
            <div style={styles.infoRowStart}>
              <Calendar style={styles.iconTop} />
              <div>
                <span style={styles.label}>Schedule:</span>
                <p style={styles.scheduleValue}>{person.schedule}</p>
              </div>
            </div>
            
            {/* Action Button */}
            <div style={styles.buttonSection}>
              <button 
                style={{
                  ...styles.button,
                  ...(person.availability === "Available" 
                    ? styles.buttonAvailable 
                    : styles.buttonUnavailable)
                }}
                disabled={person.availability !== "Available"}
                onMouseEnter={(e) => handleButtonHover(e, person.availability === "Available")}
                onMouseLeave={(e) => handleButtonLeave(e, person.availability === "Available")}
              >
                {person.availability === "Available" ? "Book Appointment" : "Currently Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Information */}
      <div style={styles.footer}>
        <div style={styles.footerInfo}>
          <Clock style={styles.footerIcon} />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
</div>
  );
};

export default DashboardPersonnels;