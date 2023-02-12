import styled from 'styled-components';

export const StatusMoves = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & a {
    margin: 0.5rem;
    display: inline-block;
    text-transform: capitalize;
    border-bottom: 1px solid transparent;
    transition: 0.3s ease-in-out;

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.secondary};
    }
  }
`;
