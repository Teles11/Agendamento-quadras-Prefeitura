import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/logo';
import AuthForm from '../components/ AuthForm';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (formData) => {
    // Simulando registro
    console.log('Register data:', formData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ 
      name: formData.name, 
      email: formData.email 
    }));
    navigate('/home');
  };

  return (
    <PageContainer>
      <Logo>Gerenciador de Quadras<span>.</span></Logo>
      <AuthForm type="register" onSubmit={handleRegister} />
    </PageContainer>
  );
};

export default Register;