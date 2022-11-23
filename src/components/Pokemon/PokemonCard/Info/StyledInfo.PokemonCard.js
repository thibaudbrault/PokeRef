import styled from 'styled-components';
import { device, Section } from '../../../../components/Common/Sizing';
import { Table } from '../../../../components/Common/Table';

export const PokemonInfoSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4rem;

  @media ${device.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & div {
      margin: 1rem 0;

      &:first-of-type {
        margin-top: 0;
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

export const PokemonInfoTable = styled(Table)`
  width: 90%;

  & th {
    background: rgba(130, 130, 130, 0.2);
    text-transform: capitalize;
  }

  & td {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    font-weight: 700;
    text-transform: capitalize;

    & a {
      width: fit-content;
      display: block;
      border-bottom: 1px solid transparent;
      transition: 0.3s ease-in-out;

      &:hover {
        border-bottom: 1px solid ${({ theme }) => theme.secondary};
      }

      & span {
        cursor: pointer;
      }
    }
  }
`;
