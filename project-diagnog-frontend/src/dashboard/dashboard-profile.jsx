import { useState, useRef } from 'react';
import { Camera, Edit2, Save, X, Plus, MapPin, Phone, Mail, User, Calendar, FileText } from 'lucide-react';

const DashboardProfile = () => {
  // Mock user data - replace with actual data from your database
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    profilePicture: null
  });

  const [contacts, setContacts] = useState([
    {
      id: 1,
      type: 'Emergency Contact',
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      email: 'jane.doe@email.com'
    },
    {
      id: 2,
      type: 'Doctor',
      name: 'Dr. Smith',
      relationship: 'Primary Care Physician',
      phone: '+1 (555) 111-2222',
      email: 'dr.smith@clinic.com'
    }
  ]);

  const [locationInfo, setLocationInfo] = useState({
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });

  const [skinConditions, setSkinConditions] = useState([
    {
      id: 1,
      condition: 'Acne',
      diagnosedDate: '2023-01-15',
      severity: 'Moderate',
      treatment: 'Topical retinoids',
      status: 'Ongoing'
    },
    {
      id: 2,
      condition: 'Eczema',
      diagnosedDate: '2022-08-20',
      severity: 'Mild',
      treatment: 'Moisturizers and corticosteroids',
      status: 'Controlled'
    }
  ]);

  const [isEditing, setIsEditing] = useState({
    userInfo: false,
    contacts: false,
    location: false,
    conditions: false
  });

  const [newContact, setNewContact] = useState({
    type: '',
    name: '',
    relationship: '',
    phone: '',
    email: ''
  });

  const [newCondition, setNewCondition] = useState({
    condition: '',
    diagnosedDate: '',
    severity: '',
    treatment: '',
    status: ''
  });

  const fileInputRef = useRef(null);

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo(prev => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = (section) => {
    setIsEditing(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts(prev => [...prev, { ...newContact, id: Date.now() }]);
      setNewContact({ type: '', name: '', relationship: '', phone: '', email: '' });
    }
  };

  const handleAddCondition = () => {
    if (newCondition.condition && newCondition.diagnosedDate) {
      setSkinConditions(prev => [...prev, { ...newCondition, id: Date.now() }]);
      setNewCondition({ condition: '', diagnosedDate: '', severity: '', treatment: '', status: '' });
    }
  };

  const handleRemoveContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleRemoveCondition = (id) => {
    setSkinConditions(prev => prev.filter(condition => condition.id !== id));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '24px'
    },
    maxWidthContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '32px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '24px'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    buttonBlue: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    buttonGreen: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    buttonPurple: {
      backgroundColor: '#8b5cf6',
      color: 'white'
    },
    buttonOrange: {
      backgroundColor: '#f59e0b',
      color: 'white'
    },
    profilePictureContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '24px'
    },
    profilePictureWrapper: {
      position: 'relative'
    },
    profilePicture: {
      width: '128px',
      height: '128px',
      borderRadius: '50%',
      backgroundColor: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    profileImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    cameraButton: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    hiddenInput: {
      display: 'none'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '4px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      transition: 'all 0.2s',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    textWithIcon: {
      display: 'flex',
      alignItems: 'center',
      color: '#1f2937',
      fontWeight: '500'
    },
    icon: {
      marginRight: '8px',
      color: '#6b7280'
    },
    gridTwo: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    gridThree: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '12px'
    },
    addForm: {
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px'
    },
    addFormTitle: {
      fontWeight: '500',
      marginBottom: '12px'
    },
    contactCard: {
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      marginBottom: '16px'
    },
    contactHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px'
    },
    contactName: {
      fontWeight: '500',
      color: '#1f2937'
    },
    removeButton: {
      color: '#ef4444',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px'
    },
    contactInfo: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '4px'
    },
    conditionCard: {
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      marginBottom: '16px'
    },
    conditionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px'
    },
    statusBadge: {
      padding: '4px 8px',
      fontSize: '12px',
      borderRadius: '9999px',
      fontWeight: '500',
      marginRight: '8px'
    },
    statusOngoing: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    statusControlled: {
      backgroundColor: '#fef3c7',
      color: '#d97706'
    },
    statusResolved: {
      backgroundColor: '#dcfce7',
      color: '#16a34a'
    },
    conditionDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      fontSize: '14px',
      color: '#6b7280'
    },
    strong: {
      fontWeight: '600'
    }
  };

  return (
 <div id="DashboardText-container">
    <div style={styles.container}>
      <div style={styles.maxWidthContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Profile Dashboard</h1>
          <p style={styles.subtitle}>Manage your personal information and medical history</p>
        </div>

        <div style={styles.grid}>
          {/* Profile Information Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <User style={styles.icon} size={24} />
                Profile Information
              </h2>
              <button
                onClick={() => handleEditToggle('userInfo')}
                style={{...styles.button, ...styles.buttonBlue}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                {isEditing.userInfo ? <Save size={16} style={{marginRight: '4px'}} /> : <Edit2 size={16} style={{marginRight: '4px'}} />}
                {isEditing.userInfo ? 'Save' : 'Edit'}
              </button>
            </div>

            {/* Profile Picture Section */}
            <div style={styles.profilePictureContainer}>
              <div style={styles.profilePictureWrapper}>
                <div style={styles.profilePicture}>
                  {userInfo.profilePicture ? (
                    <img src={userInfo.profilePicture} alt="Profile" style={styles.profileImage} />
                  ) : (
                    <User size={48} color="#9ca3af" />
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={styles.cameraButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  <Camera size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  style={styles.hiddenInput}
                />
              </div>
            </div>

            {/* User Information */}
            <div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                {isEditing.userInfo ? (
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                ) : (
                  <p style={styles.textWithIcon}>{userInfo.name}</p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                {isEditing.userInfo ? (
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                ) : (
                  <p style={styles.textWithIcon}>
                    <Mail size={16} style={styles.icon} />
                    {userInfo.email}
                  </p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                {isEditing.userInfo ? (
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                ) : (
                  <p style={styles.textWithIcon}>
                    <Phone size={16} style={styles.icon} />
                    {userInfo.phone}
                  </p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Birth</label>
                {isEditing.userInfo ? (
                  <input
                    type="date"
                    value={userInfo.dateOfBirth}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                ) : (
                  <p style={styles.textWithIcon}>
                    <Calendar size={16} style={styles.icon} />
                    {new Date(userInfo.dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location Information Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <MapPin style={styles.icon} size={24} />
                Location & Address
              </h2>
              <button
                onClick={() => handleEditToggle('location')}
                style={{...styles.button, ...styles.buttonGreen}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
              >
                {isEditing.location ? <Save size={16} style={{marginRight: '4px'}} /> : <Edit2 size={16} style={{marginRight: '4px'}} />}
                {isEditing.location ? 'Save' : 'Edit'}
              </button>
            </div>

            <div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                {isEditing.location ? (
                  <input
                    type="text"
                    value={locationInfo.address}
                    onChange={(e) => setLocationInfo(prev => ({ ...prev, address: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                ) : (
                  <p style={styles.textWithIcon}>{locationInfo.address}</p>
                )}
              </div>

              <div style={styles.gridTwo}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>City</label>
                  {isEditing.location ? (
                    <input
                      type="text"
                      value={locationInfo.city}
                      onChange={(e) => setLocationInfo(prev => ({ ...prev, city: e.target.value }))}
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  ) : (
                    <p style={styles.textWithIcon}>{locationInfo.city}</p>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>State</label>
                  {isEditing.location ? (
                    <input
                      type="text"
                      value={locationInfo.state}
                      onChange={(e) => setLocationInfo(prev => ({ ...prev, state: e.target.value }))}
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  ) : (
                    <p style={styles.textWithIcon}>{locationInfo.state}</p>
                  )}
                </div>
              </div>

              <div style={styles.gridTwo}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>ZIP Code</label>
                  {isEditing.location ? (
                    <input
                      type="text"
                      value={locationInfo.zipCode}
                      onChange={(e) => setLocationInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  ) : (
                    <p style={styles.textWithIcon}>{locationInfo.zipCode}</p>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Country</label>
                  {isEditing.location ? (
                    <input
                      type="text"
                      value={locationInfo.country}
                      onChange={(e) => setLocationInfo(prev => ({ ...prev, country: e.target.value }))}
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  ) : (
                    <p style={styles.textWithIcon}>{locationInfo.country}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contacts Section */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <Phone style={styles.icon} size={24} />
                Emergency Contacts
              </h2>
              <button
                onClick={() => handleEditToggle('contacts')}
                style={{...styles.button, ...styles.buttonPurple}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#8b5cf6'}
              >
                <Plus size={16} style={{marginRight: '4px'}} />
                Add Contact
              </button>
            </div>

            {isEditing.contacts && (
              <div style={styles.addForm}>
                <h3 style={styles.addFormTitle}>Add New Contact</h3>
                <div style={styles.gridTwo}>
                  <input
                    type="text"
                    placeholder="Contact Type"
                    value={newContact.type}
                    onChange={(e) => setNewContact(prev => ({ ...prev, type: e.target.value }))}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                    style={styles.input}
                  />
                </div>
                <div style={styles.gridThree}>
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                    style={styles.input}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newContact.phone}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    style={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    style={styles.input}
                  />
                </div>
                <button
                  onClick={handleAddContact}
                  style={{...styles.button, ...styles.buttonPurple, marginTop: '12px'}}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#8b5cf6'}
                >
                  Add Contact
                </button>
              </div>
            )}

            <div>
              {contacts.map((contact) => (
                <div key={contact.id} style={styles.contactCard}>
                  <div style={styles.contactHeader}>
                    <h3 style={styles.contactName}>{contact.name}</h3>
                    <button
                      onClick={() => handleRemoveContact(contact.id)}
                      style={styles.removeButton}
                      onMouseOver={(e) => e.target.style.color = '#dc2626'}
                      onMouseOut={(e) => e.target.style.color = '#ef4444'}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p style={styles.contactInfo}>{contact.type} - {contact.relationship}</p>
                  <p style={styles.contactInfo}>
                    <Phone size={14} style={{marginRight: '4px', verticalAlign: 'middle'}} />
                    {contact.phone}
                  </p>
                  <p style={styles.contactInfo}>
                    <Mail size={14} style={{marginRight: '4px', verticalAlign: 'middle'}} />
                    {contact.email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skin Conditions Section */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <FileText style={styles.icon} size={24} />
                Skin Conditions History
              </h2>
              <button
                onClick={() => handleEditToggle('conditions')}
                style={{...styles.button, ...styles.buttonOrange}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d97706'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f59e0b'}
              >
                <Plus size={16} style={{marginRight: '4px'}} />
                Add Condition
              </button>
            </div>

            {isEditing.conditions && (
              <div style={styles.addForm}>
                <h3 style={styles.addFormTitle}>Add New Condition</h3>
                <div style={styles.gridTwo}>
                  <input
                    type="text"
                    placeholder="Condition Name"
                    value={newCondition.condition}
                    onChange={(e) => setNewCondition(prev => ({ ...prev, condition: e.target.value }))}
                    style={styles.input}
                  />
                  <input
                    type="date"
                    placeholder="Diagnosed Date"
                    value={newCondition.diagnosedDate}
                    onChange={(e) => setNewCondition(prev => ({ ...prev, diagnosedDate: e.target.value }))}
                    style={styles.input}
                  />
                </div>
                <div style={styles.gridThree}>
                  <select
                    value={newCondition.severity}
                    onChange={(e) => setNewCondition(prev => ({ ...prev, severity: e.target.value }))}
                    style={styles.select}
                  >
                    <option value="">Select Severity</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Treatment"
                    value={newCondition.treatment}
                    onChange={(e) => setNewCondition(prev => ({ ...prev, treatment: e.target.value }))}
                    style={styles.input}
                  />
                  <select
                    value={newCondition.status}
                    onChange={(e) => setNewCondition(prev => ({ ...prev, status: e.target.value }))}
                    style={styles.select}
                  >
                    <option value="">Select Status</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Controlled">Controlled</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <button
                  onClick={handleAddCondition}
                  style={{...styles.button, ...styles.buttonOrange, marginTop: '12px'}}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#d97706'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#f59e0b'}
                >
                  Add Condition
                </button>
              </div>
            )}

            <div>
              {skinConditions.map((condition) => (
                <div key={condition.id} style={styles.conditionCard}>
                  <div style={styles.conditionHeader}>
                    <h3 style={styles.contactName}>{condition.condition}</h3>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <span style={{
                        ...styles.statusBadge,
                        ...(condition.status === 'Ongoing' ? styles.statusOngoing :
                            condition.status === 'Controlled' ? styles.statusControlled :
                            styles.statusResolved)
                      }}>
                        {condition.status}
                      </span>
                      <button
                        onClick={() => handleRemoveCondition(condition.id)}
                        style={styles.removeButton}
                        onMouseOver={(e) => e.target.style.color = '#dc2626'}
                        onMouseOut={(e) => e.target.style.color = '#ef4444'}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div style={styles.conditionDetails}>
                    <div>
                      <p><span style={styles.strong}>Diagnosed:</span> {new Date(condition.diagnosedDate).toLocaleDateString()}</p>
                      <p><span style={styles.strong}>Severity:</span> {condition.severity}</p>
                    </div>
                    <div>
                      <p><span style={styles.strong}>Treatment:</span> {condition.treatment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
};

export default DashboardProfile;