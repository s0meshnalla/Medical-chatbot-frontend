import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHospital, FaClinicMedical, FaUserMd, FaPills, FaDirections } from 'react-icons/fa';

const Container = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin: 1rem 0;
  overflow: hidden;
  border: 1px solid var(--neutral-300);
`;

const Header = styled.div`
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
  color: white;
  padding: 0.75rem 1rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ListContainer = styled(motion.div)`
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--neutral-300);
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-light);
    border-radius: 20px;
  }
`;

const ClinicItem = styled(motion.div)`
  padding: 1rem;
  border-bottom: 1px solid var(--neutral-300);
  display: flex;
  align-items: flex-start;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: var(--neutral-200);
  }
`;

const IconContainer = styled.div`
  color: ${props => {
    switch(props.type) {
      case 'hospital': return 'var(--danger-color)';
      case 'clinic': return 'var(--primary-color)';
      case 'doctors': return 'var(--accent-color)';
      case 'pharmacy': return 'var(--success-color)';
      default: return 'var(--primary-color)';
    }
  }};
  margin-right: 0.75rem;
  font-size: 1.5rem;
  padding-top: 0.25rem;
`;

const ClinicInfo = styled.div`
  flex: 1;
`;

const ClinicName = styled.h4`
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

const ClinicType = styled.div`
  font-size: 0.8rem;
  color: var(--neutral-600);
  text-transform: capitalize;
  margin-bottom: 0.5rem;
`;

const ClinicAddress = styled.div`
  font-size: 0.9rem;
  color: var(--neutral-700);
  margin-bottom: 0.5rem;
`;

const DirectionsButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }
`;

const getClinicIcon = (type) => {
  switch(type) {
    case 'hospital': return <FaHospital />;
    case 'clinic': return <FaClinicMedical />;
    case 'doctors': return <FaUserMd />;
    case 'pharmacy': return <FaPills />;
    default: return <FaClinicMedical />;
  }
};

const ClinicList = ({ clinics }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  console.log("ClinicList render, clinics:", clinics, "isExpanded:", isExpanded);
  
  const getDirectionsUrl = (lat, lon) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
  };

 
  const errorObj = clinics.find(clinic => clinic.error);
  
  if (errorObj) {
    return (
      <Container
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
      >
        <Header>
          <span>Nearby Medical Facilities</span>
        </Header>
        <div style={{ padding: '1rem', color: 'var(--danger-color)', fontWeight: '600' }}>
          Error: {errorObj.error}
        </div>
      </Container>
    );
  }
  return (
    <div style={{ background: 'white', borderRadius: '8px', margin: '1rem 0', border: '1px solid #ddd' }}>
      <div style={{ background: '#007bff', color: 'white', padding: '0.75rem 1rem' }}>
        <span>Nearby Medical Facilities</span>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>
      {isExpanded && (
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {clinics.map((clinic, index) => (
            <div key={`${clinic.name || 'unnamed'}-${clinic.type}-${index}`}>
              <div>{clinic.name || 'Unnamed Facility'}</div>
              <div>{clinic.type}</div>
              {clinic.address && <div>{clinic.address}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClinicList;
