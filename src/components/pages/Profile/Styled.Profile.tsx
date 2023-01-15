import styled from 'styled-components';

export const ProfileList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

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
