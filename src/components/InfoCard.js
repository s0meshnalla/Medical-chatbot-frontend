import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border-left: 5px solid ${props => props.color || 'var(--primary-color)'};
  
  &:hover {
    box-shadow: var(--box-shadow-elevated);
  }
`;

const Title = styled.h3`
  margin-bottom: 0.75rem;
  color: ${props => props.color || 'var(--primary-dark)'};
  font-weight: 600;
  font-size: 1.25rem;
`;

const Content = styled.div`
  color: var(--neutral-700);
`;

const InfoCard = ({ title, children, color, delay = 0 }) => {
  return (
    <Card
      color={color}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Title color={color}>{title}</Title>
      <Content>{children}</Content>
    </Card>
  );
};

export default InfoCard;