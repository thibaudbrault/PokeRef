import styled from 'styled-components';
import { device, Section } from '@/components/common/styles/Sizing';
import { Table } from '@/components/common/styles/Table';

export const PokemonMovesSection = styled(Section)`
  overflow-x: hidden;
`;

export const PokemonMovesTable = styled(Table)`
  width: 100%;

  & td {
    @media ${device.sm} {
      font-size: 2rem;
    }
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

  & tbody:empty + span {
    display: block;
  }

  @media ${device.sm} {
    width: auto;
  }
`;

export const PokemonMovesMachine = styled.td`
  text-transform: uppercase;
`;
