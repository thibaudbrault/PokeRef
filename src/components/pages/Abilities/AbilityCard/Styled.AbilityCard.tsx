import styled from 'styled-components';
import { Table } from '../../../common/styles/Table';

export const AbilityCardSection = styled.section`
  margin: 5rem 0;
`;

export const AbilityCardEffect = styled.div`
  margin: 0 0 3rem;

  & p {
    font-size: 1.7rem;
  }
`;

export const AbilityCardTable = styled(Table)`
  width: 100%;
  & th {
    background: rgba(130, 130, 130, 0.2);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: capitalize;
  }

  & td {
    text-align: center;
  }
`;

export const Sup = styled.sup`
  vertical-align: super;
  font-size: smaller;
`;
