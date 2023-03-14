import styled from 'styled-components';
import { MethodNav } from '../../common/styles/Navbars';
import { device } from '../../common/styles/Sizing';
import { FullWidthTable } from '../../common/styles/Table';

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
  grid-template-columns: repeat(4, 1fr);
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
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const LocationTable = styled(FullWidthTable)`
  & td {
    padding: 0;
    text-transform: capitalize;
    border-top: 2px solid rgba(130, 130, 130, 0.2);
    border-bottom: 2px solid rgba(130, 130, 130, 0.2);
    & p {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      border-top: 1px solid rgba(130, 130, 130, 0.2);

      &:first-of-type {
        border-top: none;
      }
    }

    & span {
      &:after {
        margin-left: 1rem;
        content: '&';
      }

      &:last-of-type {
        &:after {
          content: '';
        }
      }
    }
  }

  & tfoot {
    & td {
      padding: 1.5rem;
    }
  }
`;
