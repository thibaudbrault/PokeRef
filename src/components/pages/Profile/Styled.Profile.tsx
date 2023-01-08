import styled from 'styled-components';

export const AddTeamBtn = styled.button`
  width: 100%;
  padding: 2rem 0;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.secondary};
  font-size: 3rem;
  font-weight: 500;
  transition: 0.3s ease-in-out;

  &:active {
    background: ${({ theme }) => theme.secondary};
    border: 1px solid ${({ theme }) => theme.main};
    color: ${({ theme }) => theme.main};
  }
`;
