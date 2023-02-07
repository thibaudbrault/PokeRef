import styled from 'styled-components';
import { MethodNav } from '../../common/styles/Navbars';
import { device } from '../../common/styles/Sizing';
import { ModifiedTable } from '../../common/styles/Table';

export const LocationSection = styled.section`
  & p {
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
  }
`;

export const LocationNavContainer = styled.section`
  width: 100%;
  height: 100%;

  & nav {
    margin-top: 3rem;
  }

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    display: none;
    font-size: 5rem;
    font-weight: 700;
    text-align: center;
  }

  & nav:empty + span {
    display: block;
  }
`;

export const LocationNav = styled(MethodNav)`
  padding-bottom: 3rem;

  & button {
    & p {
      text-transform: capitalize;
    }

    @media ${device.sm} {
      font-size: 1.5rem;
    }
  }
`;

export const LocationList = styled.ol`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  text-align: center;

  & li {
    align-self: center;
    font-size: 1.5rem;
    text-transform: capitalize;

    & a {
      cursor: pointer;
      transition: 0.3s ease-in-out;
      border-bottom: 1px solid transparent;
      &:hover {
        border-bottom: 1px solid ${({ theme }) => theme.secondary};
      }
    }
  }

  @media ${device.sm} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const LocationTable = styled(ModifiedTable)`
  & td {
    text-transform: capitalize;
  }

  & span {
    position: absolute;
    width: 100%;
    margin-top: 2rem;
    display: none;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }

  & tbody:empty + tfoot {
    display: block;
  }
`;
