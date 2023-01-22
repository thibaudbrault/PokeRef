import styled from 'styled-components';

export const ProfileList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  margin: 4rem 0 3rem;

  & li {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 5px;
  }
`;

export const ProfileListLeft = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  & img {
    align-self: center;
  }
`;

export const ProfileListRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProfileSubmit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    padding: 0.5rem 5rem;
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};
    border: 1px solid transparent;
    border-radius: 5px;
    font-size: 3rem;
    transition: 0.3s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.main};
      color: ${({ theme }) => theme.secondary};
      border: 1px solid ${({ theme }) => theme.secondary};
    }
  }
`;