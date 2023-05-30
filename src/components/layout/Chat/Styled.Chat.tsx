import { Input } from '@/components/common/styles/Inputs';
import styled from 'styled-components';

export const ChatSection = styled.section`
  width: 90%;
  margin: 0 auto;
`;

export const ChatForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 5vw;
`;

export const ChatInput = styled(Input)`
  width: 100%;
  & input {
    width: 100%;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    &:focus {
      border-right: none;
    }
  }
`;

export const ChatSubmit = styled.button`
  background: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: 0.3s ease-in-out;

  & svg {
    fill: ${({ theme }) => theme.main};
    font-size: 1.7rem;
  }

  &:hover {
    background: ${({ theme }) => theme.main};

    & svg {
      fill: ${({ theme }) => theme.secondary};
    }
  }
`;
