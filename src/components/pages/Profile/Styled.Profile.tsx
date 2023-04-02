import styled from 'styled-components';

export const ProfileList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  gap: 1rem;
  padding: 2rem 0;

  & li {
    font-size: 1.5rem;
  }
`;

export const ProfileCaught = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 2rem 0;
  gap: 1rem;

  & li {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 4rem 2rem;
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};
    border-radius: 5px;

    & a {
      font-size: 2rem;
      font-weight: 600;
      text-transform: capitalize;
      cursor: pointer;
    }

    & button {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      padding: 1rem 0;
      background: ${({ theme }) => theme.main};
      color: ${({ theme }) => theme.secondary};
      border: none;
      border: 1px solid ${({ theme }) => theme.secondary};
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      font-size: 1.5rem;
      transition: 0.3s ease-in-out;

      &:hover {
        background: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.main};
        border-top: 1px solid ${({ theme }) => theme.main};
      }

      &:active {
        color: ${({ theme }) => theme.red};
      }
    }
  }
`;
