import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;
`;

const WelcomeMessage = styled.h1`
  color: #ffffff; /* Texto branco apenas para o título */
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3); /* Opcional: sombra para melhor contraste */
`;

const UserInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  
  p {
    color: #000000; /* Texto preto para os parágrafos */
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <HomeContainer>
      <WelcomeMessage>Bem-vindo ao MeuApp!</WelcomeMessage>
      <UserInfo>
        <p>Olá, {user?.name || user?.email}!</p>
        <p>Você está logado no sistema.</p>
      </UserInfo>
      <Button $primary onClick={handleLogout}>
        Sair
      </Button>
    </HomeContainer>
  );
};

export default Home;