import styled from 'styled-components';
import { device, Section } from '../../../../CommonStyles/Sizing';
import { Table } from '../../../../CommonStyles/Table';

export const PokemonInfoSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4rem;

  @media ${device.lg} {
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
    font-size: 1.7rem;
    font-weight: 700;
    text-transform: capitalize;
    text-align: start;

    & a {
      width: fit-content;
      display: block;
      transition: 0.3s ease-in-out;

      &:hover {
        text-decoration: underline;
      }

      & span {
        cursor: pointer;
      }
    }
  }
`;
