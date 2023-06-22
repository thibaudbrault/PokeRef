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
  flex-wrap: wrap;
  padding: 2rem 0;
  gap: 2rem;

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
      transition: 0.3s ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.red};
      }
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

export const ProfileDetails = styled.details`
  & summary {
    width: fit-content;
    font-size: 3rem;
    font-weight: 600;
    cursor: pointer;
  }
`;

export const ProfileForm = styled.form`
  width: 90%;
  margin: 2rem auto 0;
  display: grid;
  grid-template-areas:
    'input input'
    'button button';
  justify-items: stretch;
  align-items: stretch;
  gap: 2rem;

  & input {
    width: 100%;
    grid-area: input;
  }

  & button {
    grid-area: button;
    width: fit-content;
    margin: 0 auto;
    padding: 0.5rem 1.5rem;
    font-size: 2rem;
    background: ${({ theme }) => theme.secondary};
    border: 1px solid ${({ theme }) => theme.main};
    border-radius: 5px;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.secondary};
      background: transparent;
      border: 1px solid ${({ theme }) => theme.secondary};
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;
