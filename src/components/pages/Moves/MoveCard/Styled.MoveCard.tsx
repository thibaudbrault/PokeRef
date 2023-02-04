import Link from 'next/link';
import styled from 'styled-components';
import { device, MainBig } from '../../../common/styles/Sizing';

export const MoveList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 5rem;

  & li {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 3rem;
    width: 21rem;
    height: 32rem;
    padding: 2rem 3rem;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    font-size: 1.5rem;
    text-align: center;
    border: 1px solid transparent;
    transition: 0.3s ease-in-out;

    &:hover {
      border: 1px solid ${({ theme }) => theme.red};
    }

    @media ${device.sm} {
      width: 18rem;
      height: 27rem;
      margin: 2rem;
      padding: 1.5rem 2.5rem;
    }
  }

  &:empty {
    margin-bottom: 0;
  }

  @media ${device.sm} {
    justify-content: space-evenly;
  }
`;

export const MoveText = styled.p`
  margin: 0 0 3rem;
  font-size: 1.5rem;
`;

export const MoveLink = styled(Link)`
  font-size: 1.5rem;
  font-family: 'Press Start 2P';
  text-transform: capitalize;
  transition: 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.red};
  }
`;

export const MoveListEmpty = styled.span`
  width: 100%;
  margin-bottom: 5rem;
  display: none;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

export const MoveMainBig = styled(MainBig)`
  & ${MoveList}:empty + ${MoveListEmpty} {
    display: block;
  }
`;
