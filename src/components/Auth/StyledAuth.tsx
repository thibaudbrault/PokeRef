import styled from 'styled-components';
import { device } from '../Common/Sizing';

export const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 85%;
  height: 50vh;
  margin: 0 auto;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.main};
  border-radius: 5px 5px;

  @media ${device.sm} {
    width: 95%;
  }
`;

export const AuthImage = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.main};
  border-radius: 5px 0 0 5px;
  background-image: url('https://www.pokepedia.fr/images/2/26/Frimapic.png'),
    linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%);
  background-blend-mode: multiply;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const AuthImage2 = styled(AuthImage)`
  background-image: url('https://www.pokepedia.fr/images/0/0e/Rosalia_HGSS.png'),
    linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%);
`;

export const AuthForm = styled.form`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

export const AuthTitle = styled.div`
  & p {
    width: 90%;
    margin: 0 auto;
    font-size: 1.3rem;
    text-align: center;
    font-weight: 400;
  }
`;

export const AuthChoice = styled.p`
  font-size: 1.7rem;
  font-weight: 700;
`;

export const AuthInput = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;

  & div {
    width: 100%;
    margin-bottom: 2rem;
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
    & p {
      margin: 0.5rem 0 0 0.5rem;
      color: ${({ theme }) => theme.red};
      font-size: 1.3rem;
      text-transform: capitalize;
    }
  }
`;

export const AuthSwitch = styled.p`
  width: 100%;
  font-weight: 400;
  text-align: center;
  font-size: 1.7rem;

  & a {
    font-weight: 700;
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
  font-weight: 700;
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
`;

export const AuthSecBtn = styled(AuthBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  background: none;
  color: ${({ theme }) => theme.main};
  margin-bottom: 2rem;

  & span {
    margin-left: 1rem;
  }
`;
