import styled from 'styled-components';
import { device } from '../../common/styles/Sizing';

export const HeaderBtnConnect = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 1.5rem;
    background: ${({ theme }) => theme.secondary};
    border: 1px solid transparent;
    border-radius: 5px;
    color: ${({ theme }) => theme.main};
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    @media ${device.md} {
      font-size: 3rem;
    }

    &:first-of-type {
      background: transparent;
      border-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.secondary};
    }

    &:hover {
      background: transparent;
      border-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.secondary};
    }
  }
`;

export const HeaderBtnConnected = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  & a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 1.5rem;
    background: ${({ theme }) => theme.secondary};
    border: 1px solid transparent;
    border-radius: 5px;
    color: ${({ theme }) => theme.main};
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background: transparent;
      border-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.secondary};
    }

    @media ${device.md} {
      font-size: 3rem;
    }
  }

  & :first-child {
    background: transparent;
    border-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};
  }

  @media ${device.md} {
    width: 100%;
    justify-content: space-evenly;
  }
`;

export const HeaderContainer = styled.header`
  width: 80%;
  height: 10vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${device.md} {
    width: 90%;
  }

  @media ${device.sm} {
    width: 95%;
  }

  & ${HeaderBtnConnect}, ${HeaderBtnConnected} {
    @media ${device.md} {
      display: none;
    }
  }
`;

export const HeaderBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HeaderBtnTheme = styled.button`
  width: 3rem;
  height: 3rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondary};
  font-size: 3rem;
`;

export const BurgerOpen = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 5vh;
  right: 5vw;
  z-index: 4;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.main};
  font-size: 3rem;

  @media ${device.md} {
    display: flex;
  }
`;

export const BurgerClose = styled.button`
  display: none;
  font-size: 3rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.secondary};

  @media ${device.md} {
    display: flex;
  }
`;
