import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Updated import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';
import InfoCard from '../components/InfoCard';
import { FaInfoCircle, FaShieldAlt, FaUserMd } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const Sidebar = styled.div`
  @media (max-width: 991px) {
    order: -1;
  }
`;

const WelcomeHeader = styled(motion.div)`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-dark);
  
  span {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--neutral-600);
  max-width: 800px;
  margin: 0 auto;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  background-color: var(--neutral-800);
  color: white;
  font-size: 0.9rem;
`;

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
`;

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  margin-bottom: 1rem;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
`;

const HomePage = () => {
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/sessions`);
        setSessionId(response.data.sessionId);
      } catch (error) {
        console.error('Failed to initialize session:', error);
        setError('Failed to connect to the server. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeSession();
  }, []);
  
  const handleSendMessage = async (message, location) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/chat`, {
        sessionId,
        message,
        location
      });
      
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };
  
  if (error) {
    return (
      <PageContainer>
        <Header />
        <MainContent>
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h2>Error</h2>
            <p>{error}</p>
            <button 
              style={{ 
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--border-radius)'
              }}
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </MainContent>
        <Footer>
          © {new Date().getFullYear()} Medical Symptom Analyzer | Disclaimer: This is not a substitute for professional medical advice
        </Footer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      {isLoading && (
        <LoadingOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <LoadingText>Connecting to Medical Assistant...</LoadingText>
        </LoadingOverlay>
      )}
      
      <Header />
      
      <MainContent>
        <WelcomeHeader
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Title>Your <span>Medical Symptom</span> Analyzer</Title>
          <Subtitle>Get information about symptoms, find nearby medical facilities, and access health resources</Subtitle>
        </WelcomeHeader>
        
        <TwoColumnLayout>
          <ChatWindow onSendMessage={handleSendMessage} />
          
          <Sidebar>
            <InfoCard 
              title="How to Use" 
              color="var(--primary-color)"
              delay={0.3}
            >
              <p>
                <FaInfoCircle style={{ marginRight: '0.5rem' }} />
                Ask about any medical symptoms you're experiencing.
              </p>
              <p>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '0.5rem' }} />
                Set your location to find nearby clinics and hospitals.
              </p>
              <p>
                <FaUserMd style={{ marginRight: '0.5rem' }} />
                Get information about when to seek professional care.
              </p>
            </InfoCard>
            
            <InfoCard 
              title="Privacy & Security" 
              color="var(--success-color)"
              delay={0.5}
            >
              <p>
                <FaShieldAlt style={{ marginRight: '0.5rem' }} />
                Your conversations are stored securely to provide better assistance.
              </p>
              <p>We retain context from your previous conversations to give you more personalized help.</p>
            </InfoCard>
            
            <InfoCard 
              title="Medical Disclaimer" 
              color="var(--warning-color)"
              delay={0.7}
            >
              <p>This tool provides general information and is not a substitute for professional medical advice.</p>
              <p>Always consult with a qualified healthcare provider for medical concerns.</p>
            </InfoCard>
          </Sidebar>
        </TwoColumnLayout>
      </MainContent>
      
      <Footer>
        © {new Date().getFullYear()} Medical Symptom Analyzer | Disclaimer: This is not a substitute for professional medical advice
      </Footer>
    </PageContainer>
  );
};

export default HomePage;