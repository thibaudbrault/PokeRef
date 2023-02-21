import { FullWidthTable } from '@/components/common/styles/Table';
import styled from 'styled-components';

export const PokemonLocationsTable = styled(FullWidthTable)`
  & td {
    padding: 0;
    text-transform: capitalize;
    & p {
      padding: 1.5rem;
      border-top: 1px solid rgba(130, 130, 130, 0.2);

      &:first-of-type {
        border-top: none;
      }
    }
  }

  & tfoot {
    display: none;
    text-align: center;

    & tr {
      & td {
        padding: 1.5rem;
        font-size: 2rem;
        font-weight: 700;
      }
    }
  }

  & tbody:empty + tfoot {
    display: table-footer-group;
  }
`;
