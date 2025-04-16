import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #3a86ff;
    --primary-light: #8bb8ff;
    --primary-dark: #0043ce;
    --secondary-color: #ff006e;
    --secondary-light: #ff6b9d;
    --secondary-dark: #c10050;
    --accent-color: #5e60ce;
    --success-color: #38b000;
    --warning-color: #ffbe0b;
    --danger-color: #d90429;
    --neutral-100: #ffffff;
    --neutral-200: #f8f9fa;
    --neutral-300: #e9ecef;
    --neutral-400: #dee2e6;
    --neutral-500: #adb5bd;
    --neutral-600: #6c757d;
    --neutral-700: #495057;
    --neutral-800: #343a40;
    --neutral-900: #212529;
    --font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --box-shadow-elevated: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --border-radius: 8px;
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background: linear-gradient(135deg, var(--neutral-200) 0%, var(--neutral-300) 100%);
    color: var(--neutral-800);
    line-height: 1.6;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-dark);
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 1rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(58, 134, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(58, 134, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(58, 134, 255, 0);
    }
  }

  /* Import Google Font */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
`;

export default GlobalStyles;