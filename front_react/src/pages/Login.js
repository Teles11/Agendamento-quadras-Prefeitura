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

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    // Simulando autenticação
    console.log('Login data:', formData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    navigate('/home');
  };

  return (
    <PageContainer>
      <Logo>Gerenciador de Quadras<span>.</span></Logo>
      <AuthForm type="login" onSubmit={handleLogin} />
    </PageContainer>
  );
};

export default Login;