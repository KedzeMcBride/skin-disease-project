import  { useState, useEffect } from 'react';
import { User, Upload, Image, AlertCircle, Stethoscope, BookOpen, Shield, Clock } from 'lucide-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';

const DashboardReports = () => {
const userEmail = sessionStorage.getItem('userEmail');

// State to hold patient information
  const [patientInfo, setPatientInfo] = useState({
    fullName: '',
    age: '',
    contact: '',
    dateOfReport: ''
  });
  //hold medical history
  const [medicalHistory, setMedicalHistory] = useState({
    pastDetections: [],
    previousTreatments: []
  });

useEffect(() => {
console.log("userEmail:", userEmail);
  axios.get(`http://localhost:8081/user/report/${userEmail}`)
    .then(res => {
      console.log("API response:", res.data); // <--- Add this
      setPatientInfo(res.data);
    })
    .catch(() => setPatientInfo({
      fullName: 'N/A',
      age: 'N/A',
      contact: 'N/A',
      dateOfReport: 'N/A'
    }));
    if (userEmail) {
      axios.get(`http://localhost:8081/user/medical-history/${userEmail}`)
        .then(res => {
          const detections = res.data.map(item => item.conditions).filter(Boolean);
          const treatments = res.data.map(item => item.treatment).filter(Boolean);
          setMedicalHistory({
            pastDetections: detections,
            previousTreatments: treatments
          });
        })
        .catch(() => setMedicalHistory({
          pastDetections: [],
          previousTreatments: []
        }));
    }
}, [userEmail]);



    // Sample patient data
  const [patientData] = useState({
    patientInformation: {
      fullName: "Sarah Johnson",
      age: 28,
      gender: "Female",
      dateOfReport: "2024-05-25",
      patientID: "PT-2024-5678",
      contact: "(555) 987-6543"
    },
    imageDetails: {
      uploadedImage: "dermatology-scan.jpg",
      metadata: {
        uploadTime: "2024-05-25T14:30:00Z",
        size: "3.2MB"
      },
      bodyPartCaptured: "Left Forearm"
    },
    diagnosisResult: {
      skinDiseaseName: "Psoriasis",
      confidenceScore: "94%",
      infoLink: "https://medinfo.com/psoriasis"
    },
    description: {
      overview: "Psoriasis is a chronic autoimmune condition that causes rapid skin cell buildup, resulting in scaling on the skin's surface.",
      commonSymptoms: "Red patches of skin covered with thick, silvery scales, dry cracked skin that may bleed, itching and burning",
      causes: "Genetic factors, immune system dysfunction, environmental triggers",
      contagious: "No",
      severityLevel: "Moderate"
    },
    recommendedAction: {
      seeProfessional: true,
      treatment: "Topical corticosteroids, moisturizing creams, phototherapy",
      otcOptions: "Coal tar shampoo, salicylic acid creams, moisturizers",
      urgencyLevel: "Normal"
    },
    medicalHistory: {
      pastDetections: "Mild eczema (2022), Contact dermatitis (2023)",
      previousTreatments: "Hydrocortisone cream, antihistamines"
    }
  });

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'mild': return { color: '#16a34a', backgroundColor: '#f0fdf4' };
      case 'moderate': return { color: '#ca8a04', backgroundColor: '#fefce8' };
      case 'severe': return { color: '#dc2626', backgroundColor: '#fef2f2' };
      default: return { color: '#6b7280', backgroundColor: '#f9fafb' };
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'normal': return { color: '#16a34a', backgroundColor: '#f0fdf4' };
      case 'urgent': return { color: '#ea580c', backgroundColor: '#fff7ed' };
      case 'emergency': return { color: '#dc2626', backgroundColor: '#fef2f2' };
      default: return { color: '#6b7280', backgroundColor: '#f9fafb' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const styles = {
    container: {
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    },
    header: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0
    },
    headerSubtitle: {
      color: '#bfdbfe',
      marginTop: '4px',
      margin: 0
    },
    headerRight: {
      textAlign: 'right'
    },
    headerLabel: {
      fontSize: '14px',
      color: '#bfdbfe'
    },
    headerCode: {
      fontFamily: 'monospace',
      fontSize: '18px',
      margin: 0
    },
    content: {
      padding: '24px'
    },
    section: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '32px'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      marginLeft: '8px',
      margin: 0
    },
    icon: {
      color: '#2563eb'
    },
    grid: {
      display: 'grid',
      gap: '16px'
    },
    gridCols3: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    },
    gridCols2: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    },
    fieldGroup: {
      marginBottom: '16px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6b7280',
      display: 'block',
      marginBottom: '4px'
    },
    value: {
      fontSize: '16px',
      color: '#1f2937'
    },
    valueLarge: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937'
    },
    imageUpload: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      border: '2px dashed #d1d5db',
      textAlign: 'center'
    },
    imageIcon: {
      width: '48px',
      height: '48px',
      color: '#9ca3af',
      margin: '0 auto 8px'
    },
    imageText: {
      fontSize: '14px',
      color: '#6b7280'
    },
    imageSubtext: {
      fontSize: '12px',
      color: '#9ca3af',
      marginTop: '4px'
    },
    diagnosisSection: {
      backgroundColor: '#eff6ff'
    },
    diagnosisTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1d4ed8',
      marginBottom: '8px'
    },
    confidenceBadge: {
      backgroundColor: '#f0fdf4',
      color: '#16a34a',
      padding: '6px 12px',
      borderRadius: '9999px',
      fontSize: '14px',
      fontWeight: '500',
      display: 'inline-block'
    },
    learnMoreBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 16px',
      backgroundColor: '#2563eb',
      color: 'white',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s',
      border: 'none',
      cursor: 'pointer'
    },
    learnMoreBtnIcon: {
      marginRight: '8px',
      width: '16px',
      height: '16px'
    },
    detailsSection: {
      backgroundColor: '#f9fafb'
    },
    detailItem: {
      marginBottom: '16px'
    },
    detailTitle: {
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    detailText: {
      color: '#1f2937',
      lineHeight: '1.6'
    },
    badge: {
      padding: '6px 12px',
      borderRadius: '9999px',
      fontSize: '14px',
      fontWeight: '500',
      display: 'inline-block'
    },
    nonContagiousBadge: {
      backgroundColor: '#f0fdf4',
      color: '#16a34a'
    },
    contagiousBadge: {
      backgroundColor: '#fef2f2',
      color: '#dc2626'
    },
    actionsSection: {
      backgroundColor: '#fffbeb'
    },
    actionCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    actionTitle: {
      fontWeight: '600',
      color: '#374151',
      marginBottom: '4px'
    },
    actionDesc: {
      fontSize: '14px',
      color: '#6b7280'
    },
    treatmentCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px'
    },
    historySection: {
      backgroundColor: '#f9fafb'
    },
    disclaimerSection: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '24px',
      display: 'flex',
      alignItems: 'flex-start'
    },
    disclaimerIcon: {
      color: '#dc2626',
      marginRight: '12px',
      marginTop: '4px',
      flexShrink: 0
    },
    disclaimerTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#b91c1c',
      marginBottom: '8px'
    },
    disclaimerText: {
      color: '#b91c1c',
      lineHeight: '1.6'
    },
    footer: {
      backgroundColor: '#f3f4f6',
      padding: '16px',
      textAlign: 'center'
    },
    footerText: {
      fontSize: '14px',
      color: '#6b7280'
    }
  };

  return (
    <div id="body" className="grid-container">
    <DashboardHeader></DashboardHeader>
    <DashboardNav></DashboardNav>
    <div id="DashboardText-container">
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>Patient Condition Report</h1>
            <p style={styles.headerSubtitle}>Dermatological Analysis & Recommendations</p>
          </div>
          <div style={styles.headerRight}>
            <p style={styles.headerLabel}>Report ID</p>
            <p style={styles.headerCode}>{patientData.patientInformation.patientID}</p>
          </div>
        </div>

        <div style={styles.content}>
          {/* Patient Information */}
          <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <User size={24} style={styles.icon} />
                <h2 style={styles.sectionTitle}>Patient Information</h2>
              </div>
              <div style={{...styles.grid, ...styles.gridCols3}}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Full Name</label>
                <p style={styles.valueLarge}>
                {patientInfo.fullName && patientInfo.fullName !== 'N/A' ? patientInfo.fullName : 'N/A'}
                </p>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Age</label>
                  <p style={styles.valueLarge}>
                 {patientInfo.age && patientInfo.age !== 'N/A' ? `${patientInfo.age} years` : 'N/A'}
                  </p>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Contact</label>
                  <p style={styles.valueLarge}>
                {patientInfo.contact && patientInfo.contact !== 'N/A' ? patientInfo.contact : 'N/A'}
                  </p>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Date of Report</label>
                  <p style={styles.valueLarge}>
                   {patientInfo.dateOfReport && patientInfo.dateOfReport !== 'N/A' && patientInfo.dateOfReport !== null? formatDate(patientInfo.dateOfReport): 'N/A'}
                  </p>
                </div>
              </div>
            </section>
          {/* Image Details */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Image size={24} style={styles.icon} />
              <h2 style={styles.sectionTitle}>Image Analysis</h2>
            </div>
            <div style={{...styles.grid, ...styles.gridCols2}}>
              <div>
                <div style={styles.imageUpload}>
                  <Upload style={styles.imageIcon} />
                  <p style={styles.imageText}>Image: {patientData.imageDetails.uploadedImage}</p>
                  <p style={styles.imageSubtext}>Click to view full image</p>
                </div>
              </div>
              <div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Body Part</label>
                  <p style={styles.valueLarge}>{patientData.imageDetails.bodyPartCaptured}</p>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Upload Time</label>
                  <p style={styles.value}>{formatTime(patientData.imageDetails.metadata.uploadTime)}</p>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>File Size</label>
                  <p style={styles.value}>{patientData.imageDetails.metadata.size}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Diagnosis Result */}
          <section style={{...styles.section, ...styles.diagnosisSection}}>
            <div style={styles.sectionHeader}>
              <Stethoscope size={24} style={styles.icon} />
              <h2 style={styles.sectionTitle}>Diagnosis Result</h2>
            </div>
            <div style={{...styles.grid, ...styles.gridCols2}}>
              <div>
                <label style={styles.label}>Detected Condition</label>
                <p style={styles.diagnosisTitle}>{patientData.diagnosisResult.skinDiseaseName}</p>
                <div>
                  <span style={styles.confidenceBadge}>
                    Confidence: {patientData.diagnosisResult.confidenceScore}
                  </span>
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <a 
                  href={patientData.diagnosisResult.infoLink}
                  style={styles.learnMoreBtn}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                  <BookOpen style={styles.learnMoreBtnIcon} />
                  Learn More About This Condition
                </a>
              </div>
            </div>
          </section>

          {/* Description */}
          <section style={styles.detailsSection}>
            <div style={styles.sectionHeader}>
              <BookOpen size={24} style={styles.icon} />
              <h2 style={styles.sectionTitle}>Condition Details</h2>
            </div>
            <div>
              <div style={styles.detailItem}>
                <h3 style={styles.detailTitle}>Overview</h3>
                <p style={styles.detailText}>{patientData.description.overview}</p>
              </div>
              <div style={styles.detailItem}>
                <h3 style={styles.detailTitle}>Common Symptoms</h3>
                <p style={styles.detailText}>{patientData.description.commonSymptoms}</p>
              </div>
              <div style={styles.detailItem}>
                <h3 style={styles.detailTitle}>Causes</h3>
                <p style={styles.detailText}>{patientData.description.causes}</p>
              </div>
              <div style={{...styles.grid, ...styles.gridCols2}}>
                <div style={styles.fieldGroup}>
                  <h3 style={styles.detailTitle}>Contagious</h3>
                  <span style={{
                    ...styles.badge,
                    ...(patientData.description.contagious.toLowerCase() === 'no' 
                      ? styles.nonContagiousBadge 
                      : styles.contagiousBadge)
                  }}>
                    {patientData.description.contagious}
                  </span>
                </div>
                <div style={styles.fieldGroup}>
                  <h3 style={styles.detailTitle}>Severity Level</h3>
                  <span style={{
                    ...styles.badge,
                    ...getSeverityColor(patientData.description.severityLevel)
                  }}>
                    {patientData.description.severityLevel}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Recommended Actions */}
          <section style={{...styles.section, ...styles.actionsSection}}>
            <div style={styles.sectionHeader}>
              <AlertCircle size={24} style={{color: '#d97706'}} />
              <h2 style={styles.sectionTitle}>Recommended Actions</h2>
            </div>
            <div>
              <div style={styles.actionCard}>
                <div>
                  <h3 style={styles.actionTitle}>Professional Consultation</h3>
                  <p style={styles.actionDesc}>
                    {patientData.recommendedAction.seeProfessional 
                      ? "Recommended to see a dermatologist or medical professional" 
                      : "Self-care may be sufficient"}
                  </p>
                </div>
                <span style={{
                  ...styles.badge,
                  ...getUrgencyColor(patientData.recommendedAction.urgencyLevel)
                }}>
                  {patientData.recommendedAction.urgencyLevel}
                </span>
              </div>
              
              <div style={styles.treatmentCard}>
                <h3 style={styles.detailTitle}>Suggested Treatment</h3>
                <p style={styles.detailText}>{patientData.recommendedAction.treatment}</p>
              </div>
              
              <div style={styles.treatmentCard}>
                <h3 style={styles.detailTitle}>Over-the-Counter Options</h3>
                <p style={styles.detailText}>{patientData.recommendedAction.otcOptions}</p>
              </div>
            </div>
          </section>

          {/* Medical History */}
        <section style={styles.historySection}>
        <div style={styles.sectionHeader}>
            <Clock size={24} style={styles.icon} />
            <h2 style={styles.sectionTitle}>Medical History</h2>
        </div>
        <div style={{...styles.grid, ...styles.gridCols2}}>
            <div style={styles.fieldGroup}>
            <h3 style={styles.detailTitle}>Past Detections</h3>
            <ul style={styles.detailText}>
                {medicalHistory.pastDetections.length > 0 ? (
                medicalHistory.pastDetections.map((cond, idx) => (
                    <li key={idx}>{cond}</li>
                ))
                ) : (
                <li>No past detections</li>
                )}
            </ul>
            </div>
            <div style={styles.fieldGroup}>
            <h3 style={styles.detailTitle}>Previous Treatments</h3>
            <ul style={styles.detailText}>
                {medicalHistory.previousTreatments.length > 0 ? (
                medicalHistory.previousTreatments.map((treat, idx) => (
                    <li key={idx}>{treat}</li>
                ))
                ) : (
                <li>No previous treatments</li>
                )}
            </ul>
            </div>
        </div>
        </section>

          {/* Disclaimer */}
          <section style={styles.disclaimerSection}>
            <Shield size={24} style={styles.disclaimerIcon} />
            <div>
              <h2 style={styles.disclaimerTitle}>Important Disclaimer</h2>
              <p style={styles.disclaimerText}>
                This automated analysis is for informational and educational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for proper medical evaluation and treatment recommendations. The AI-generated diagnosis may not be 100% accurate and should be verified by a medical professional.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Generated on {formatDate(new Date().toISOString())} | 
            For medical emergencies, please contact your local emergency services
          </p>
        </div>
      </div>
    </div>
</div>
</div>
  );
};
DashboardReports.propTypes = {
  userEmail: PropTypes.string.isRequired
};

export default DashboardReports;
