import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}40;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;