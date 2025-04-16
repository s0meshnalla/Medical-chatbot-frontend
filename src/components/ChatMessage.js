import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRobot, FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const MessageContainer = styled(motion.div)`
  display: flex;
  margin: 1rem 0;
  align-items: flex-start;
  max-width: 90%;
  ${({ $isUser }) => ($isUser ? 'align-self: flex-end;' : 'align-self: flex-start;')}
`;

const IconContainer = styled.div`
  background-color: ${({ $isUser }) => ($isUser ? 'var(--secondary-color)' : 'var(--primary-color)')};
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--box-shadow);
  margin-right: ${({ $isUser }) => ($isUser ? '0' : '0.75rem')};
  margin-left: ${({ $isUser }) => ($isUser ? '0.75rem' : '0')};
  order: ${({ $isUser }) => ($isUser ? '1' : '0')};
`;

const MessageContent = styled.div`
  background-color: ${({ $isUser }) => ($isUser ? 'var(--secondary-light)' : 'white')};
  color: ${({ $isUser }) => ($isUser ? 'white' : 'var(--neutral-800)')};
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 10px;
    ${({ $isUser }) =>
      $isUser
        ? 'right: -8px; border-left: 8px solid var(--secondary-light);'
        : 'left: -8px; border-right: 8px solid white;'}
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`;

const Timestamp = styled.div`
  font-size: 0.7rem;
  color: ${({ $isUser }) => ($isUser ? 'rgba(255, 255, 255, 0.8)' : 'var(--neutral-600)')};
  margin-top: 0.25rem;
  text-align: right;
`;

const MessageText = styled.div`
  line-height: 1.4;
  
  p:last-child {
    margin-bottom: 0;
  }
`;

const ChatMessage = ({ message, isUser }) => {
  const getFormattedTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };
  
  return (
    <MessageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      $isUser={isUser}
    >
      <IconContainer $isUser={isUser}>
        {isUser ? <FaUser /> : <FaRobot />}
      </IconContainer>
      
      <MessageContent $isUser={isUser}>
        <MessageText>
          <ReactMarkdown>{message}</ReactMarkdown>
        </MessageText>
        <Timestamp $isUser={isUser}>{getFormattedTime()}</Timestamp>
      </MessageContent>
    </MessageContainer>
  );
};

export default ChatMessage;