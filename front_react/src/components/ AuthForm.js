import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from './Input';
import { Button } from './Button';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.dark};
`;

const SwitchFormText = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.gray};

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    ...(type === 'register' && { name: '' }),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <FormTitle>{type === 'login' ? 'Login' : 'Registrar'}</FormTitle>
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <Input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        <Button $primary type="submit">
          {type === 'login' ? 'Entrar' : 'Registrar'}
        </Button>
      </form>
      <SwitchFormText>
        {type === 'login' ? (
          <>Não tem uma conta? <Link to="/register">Registre-se</Link></>
        ) : (
          <>Já tem uma conta? <Link to="/login">Faça login</Link></>
        )}
      </SwitchFormText>
    </FormContainer>
  );
};

export default AuthForm;