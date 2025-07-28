import styled from 'styled-components';

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;