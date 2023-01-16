import styled from 'styled-components';
import { device } from '../../common/styles/Sizing';

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
`;

export const HeaderBtnContainer = styled.div`
  display: flex;
  align-items: center;

  & .cl-userButton-root {
    width: 3rem;
    height: 3rem;

    & div {
      width: 100%;
      height: 100%;
    }
  }
`;

export const HeaderBtnTheme = styled.button`
  width: 3rem;
  height: 3rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondary};
  font-size: 3rem;
`;

export const HeaderBtnConnect = styled.div`
  & a {
    padding: 0.7rem 1.5rem;
    background: ${({ theme }) => theme.secondary};
    border: 1px solid transparent;
    border-radius: 5px;
    color: ${({ theme }) => theme.main};
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:first-of-type {
      margin: 0 2rem;
      background: transparent;
      border-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.secondary};

      @media ${device.xs} {
        margin: 0 1rem;
      }
    }

    &:hover {
      background: transparent;
      border-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.secondary};
    }
  }
`;

export const HeaderBtnConnected = styled.div`
  & a,
  button {
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
  }

  & :first-child {
    margin: 0 2rem;
    background: transparent;
    border-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};

    @media ${device.xs} {
      margin: 0 1rem;
    }
  }
`;
