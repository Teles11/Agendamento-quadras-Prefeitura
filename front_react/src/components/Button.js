import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme, $primary }) => 
    $primary ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, $primary }) => 
    $primary ? theme.colors.white : theme.colors.primary};
  border: ${({ theme, $primary }) => 
    $primary ? 'none' : `1px solid ${theme.colors.primary}`};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme, $primary }) => 
      $primary ? theme.colors.secondary : theme.colors.lightGray};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
    transform: none;
  }
`;