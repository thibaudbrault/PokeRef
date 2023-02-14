import styled from 'styled-components';
import { device } from '../../common/styles/Sizing';
import { Type } from '../../common/styles/Themes';

export const TypesList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  & li {
    transition: 0.3s ease-in-out;

    &:hover {
      transform: scale(1.03);
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
      font-size: 2rem;
      font-family: 'Press Start 2P';
      border-radius: 5px;
      text-transform: uppercase;
      text-align: center;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
      color: #c4c4c4;
      cursor: pointer;
    }
  }

  @media ${device.sm} {
    margin: 2rem;
  }
`;
