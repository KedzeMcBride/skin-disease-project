import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardResult = ({ prediction }) => {
  if (!prediction || typeof prediction !== 'object') {
    return <div>No prediction data available.</div>;
  }

  const getConditionDistribution = () => {
    const baseValues = {
      ringworm: 10,
      rash: 10,
      eczema: 10
    };
    if (baseValues[prediction.prediction]) {
      baseValues[prediction.prediction] = prediction.confidence * 0.8;
    }

    const total = Object.values(baseValues).reduce((a, b) => a + b, 0);
    return {
      ringworm: Math.round((baseValues.ringworm / total) * 100),
      rash: Math.round((baseValues.rash / total) * 100),
      eczema: Math.round((baseValues.eczema / total) * 100)
    };
  };

  const distribution = getConditionDistribution();

  const conditionsData = {
    labels: ['Ringworm', 'Rash', 'Eczema'],
    datasets: [
      {
        data: [distribution.ringworm, distribution.rash, distribution.eczema],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const confidenceData = {
    labels: ['Certainty', 'Uncertainty'],
    datasets: [
      {
        data: [prediction.confidence, 100 - prediction.confidence],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div id ="DashboardText-container" style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Diagnostic Analysis</h2>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ textAlign: 'center' }}>Condition Distribution</h3>
          <div style={{ height: '300px' }}>
            <Pie data={conditionsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ textAlign: 'center' }}>Model Confidence</h3>
          <div style={{ height: '300px', position: 'relative' }}>
            <Doughnut data={confidenceData} options={{ responsive: true, maintainAspectRatio: false }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{prediction.confidence}%</div>
              <div style={{ color: '#7f8c8d' }}>Certainty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardResult.propTypes = {
  prediction: PropTypes.shape({
    prediction: PropTypes.string.isRequired,
    confidence: PropTypes.number.isRequired,
  }).isRequired,
};

export default DashboardResult;
