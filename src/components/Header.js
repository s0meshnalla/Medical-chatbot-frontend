import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';

const HeaderContainer = styled(motion.header)`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    text-align: center;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const LogoIcon = styled(motion.div)`
  color: var(--secondary-light);
  font-size: 1.8rem;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    justify-content: center;
  }
`;

const NavLink = styled(motion.a)`
  color: white;
  position: relative;
  padding: 0.25rem 0;
  font-weight: 500;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const Header = () => {
  return (
    <HeaderContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Logo>
        <LogoIcon 
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <FaHeartbeat />
        </LogoIcon>
        MedAssist
      </Logo>
      
      <Navigation>
        <NavLink 
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </NavLink>
        <NavLink 
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          About
        </NavLink>
        <NavLink 
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Resources
        </NavLink>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;