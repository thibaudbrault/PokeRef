import styled from 'styled-components';
import { device } from '../../common/styles/Sizing';
import { Type } from '../../common/styles/Themes';

export const TypesList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  & li {
    & div {
      transition: 0.3s ease-in-out;

      &:hover {
        transform: scale(1.03);
      }
    }
  }
`;

export const ModifiedType = styled(Type)`
  width: 20rem;
  margin: 3rem;
  border-radius: 5px;

  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 3rem;

    & img {
      cursor: pointer;
    }

    & h2 {
      margin-top: 1rem;
      font-size: 3rem;
      border-radius: 5px;
      text-transform: uppercase;
      text-align: center;
      color: ${({ theme }) => theme.secondary};
      text-shadow: ${({ theme }) => theme.main} -1px -1px 0px,
        ${({ theme }) => theme.main} 1px -1px 0px,
        ${({ theme }) => theme.main} -1px 1px 0px,
        ${({ theme }) => theme.main} 1px 1px 0px;
      cursor: pointer;
    }
  }

  @media ${device.sm} {
    margin: 2rem;
  }
`;
