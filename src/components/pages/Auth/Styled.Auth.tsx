import { device } from '@/components/common/styles/Sizing';
import styled from 'styled-components';
import Link from 'next/link';
import Modal from 'react-modal';

export const AuthContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.main};

  @media ${device.sm} {
    grid-template-columns: 1fr;
  }
`;

export const AuthClose = styled(Link)`
  position: absolute;
  top: 3rem;
  right: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.secondary};
  font-size: 3rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    border: 1px solid ${({ theme }) => theme.main};
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};
  }
`;

export const AuthImage = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.main};
  background-image: url('https://www.pokepedia.fr/images/2/26/Frimapic.png'),
    linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%);
  background-blend-mode: multiply;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media ${device.sm} {
    display: none;
  }
`;

export const AuthImage2 = styled(AuthImage)`
  background-image: url('https://www.pokepedia.fr/images/0/0e/Rosalia_HGSS.png'),
    linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%);
`;

export const AuthForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  gap: 3rem;
`;

export const AuthTitle = styled.div`
  & h2 {
    margin-bottom: 0;
  }

  & p {
    width: 90%;
    margin: 0 auto;
    font-size: 1.5rem;
    text-align: center;
    font-weight: 400;
  }
`;

export const AuthChoice = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
`;

export const AuthInput = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  width: 85%;
  margin: 0 auto;
  & div {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    & input {
      width: 100%;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid ${({ theme }) => theme.main};
      border-radius: 5px;
      &:focus {
        border: 1px solid ${({ theme }) => theme.red};
        outline: none;
      }
    }
    & small {
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      color: ${({ theme }) => theme.red};
      font-size: 1.3rem;
    }
  }
`;

export const AuthResetPwd = styled.button`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  font-size: 1.3rem;
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  transition: 0.3s ease-in-out;

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.main};
  }
`;

export const AuthSwitch = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.7rem;
  & a {
    font-weight: 600;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: 0.3s ease-in-out;
    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.main};
    }
  }
`;

export const AuthBtn = styled.button`
  width: 100%;
  padding: 1rem 0;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
  background: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  &:hover {
    background: none;
    color: ${({ theme }) => theme.main};
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const AuthButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;

export const AuthSecBtn = styled(AuthBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 400;
  background: none;
  color: ${({ theme }) => theme.main};

  & span {
    cursor: pointer;
  }
`;

export const AuthModal = styled(Modal)`
  width: 60%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  color: ${({ theme }) => theme.main};
  transform: translate(-50%, -50%);
  overflow-y: hidden !important;
`;
