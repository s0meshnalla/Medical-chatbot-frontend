import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import ClinicList from './ClinicList';

const ChatContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, var(--neutral-100) 0%, var(--neutral-200) 100%);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-elevated);
  width: 100%;
  max-width: 800px;
  height: 70vh;
  margin: 2rem auto;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  min-height: 0; /* Prevent flex overflow */
  width: 100%; /* Ensure full width */
  
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

const ChatInputContainer = styled.div`
  display: flex;
  padding: 1rem;
  background-color: var(--neutral-200);
  border-top: 1px solid var(--neutral-300);
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--neutral-400);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-light);
  }
`;

const SendButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  font-weight: 600;
  transition: var(--transition);
  
  svg {
    margin-left: 0.5rem;
  }
`;

const LocationButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-dark) 100%);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
`;

const LocationInput = styled(motion.div)`
  display: flex;
  padding: 0.75rem;
  background-color: var(--neutral-300);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
`;

const LocationInputField = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--neutral-400);
  border-radius: var(--border-radius);
  font-family: inherit;
`;

const LocationSubmitButton = styled(motion.button)`
  background: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  font-weight: 600;
`;

const LocationWarning = styled.div`
  color: var(--danger-color);
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const ChatWindow = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your medical assistant. How can I help you today?", isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [location, setLocation] = useState('');
  const [clinics, setClinics] = useState([]);
  const [locationWarning, setLocationWarning] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // If query likely needs location but location not set, show warning
    const locationKeywords = ["clinic", "hospital", "doctor", "facility", "nearby"];
    const inputLower = input.toLowerCase();
    const needsLocation = locationKeywords.some(keyword => inputLower.includes(keyword));
    if (needsLocation && !location.trim()) {
      setLocationWarning(true);
      return;
    } else {
      setLocationWarning(false);
    }
    
    // Add user message to chat
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send message to backend
      const response = await onSendMessage(userMessage, location);
      console.log("ChatWindow handleSend response:", response);
      if (response.data) {
        setClinics(response.data.clinics || []);
        console.log("Clinics set in state:", response.data.clinics);
      } else {
        setClinics([]);
      }
      // Add bot response to chat
      setMessages(prev => [...prev, { text: response.response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting. Please try again.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    setShowLocationInput(false);
    setMessages(prev => [...prev, { 
      text: `I'll use "${location}" as your location.`, 
      isUser: false 
    }]);
    setLocationWarning(false);
  };
  
  return (
    <ChatContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ChatHeader>
        <span>Medical Symptom Analyzer</span>
        <small>Available 24/7</small>
      </ChatHeader>
      
      <ChatBody>
        {locationWarning && (
          <LocationWarning>
            Please set your location to get nearby clinics and hospitals.
          </LocationWarning>
        )}
        <AnimatePresence>
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message.text} 
              isUser={message.isUser} 
            />
          ))}
          
          {isLoading && (
            <ChatMessage 
              message="Thinking..." 
              isUser={false} 
            />
          )}
          
          {showLocationInput && (
            <LocationInput
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <LocationInputField
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                autoFocus
              />
              <LocationSubmitButton
                onClick={handleLocationSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Set
              </LocationSubmitButton>
            </LocationInput>
          )}
          
          {clinics.length > 0 && (
            <ClinicList clinics={clinics} />
          )}
          
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </ChatBody>
      
      <ChatInputContainer as="form" onSubmit={handleSend}>
        <ChatInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your health question..."
          disabled={isLoading}
        />
        
        <LocationButton
          type="button"
          onClick={() => setShowLocationInput(!showLocationInput)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Set your location"
        >
          <FaMapMarkerAlt />
        </LocationButton>
        
        <SendButton
          type="submit"
          disabled={!input.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send <FaPaperPlane />
        </SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default ChatWindow;
