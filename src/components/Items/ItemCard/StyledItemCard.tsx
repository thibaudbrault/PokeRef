import styled from 'styled-components';
import { Table } from '../../Common/Table';

export const ItemCardDataSection = styled.section`
  margin: 5rem 0;
  display: grid;
  grid-template-columns: 75% 25%;
  align-items: center;
`;

export const ItemCardDataEffect = styled.div`
  margin: 0 0 3rem;

  & h3 {
    margin: 0 0 1rem;
    font-size: 3rem;
    font-weight: 700;
  }

  & p {
    font-size: 1.7rem;
  }
`;

export const ItemCardDataCost = styled.p`
  margin: 0 0 1rem;
  font-size: 1.7rem;
  font-weight: 700;
`;

export const ItemCardDataHeld = styled.p`
  margin: 0 0 1rem;
  font-size: 1.7rem;

  & a {
    display: inline-block;
    padding: 0 0.5rem;
    text-transform: capitalize;
  }
`;

export const ItemCardDataFling = styled.p`
  font-size: 1.7rem;
`;

export const ItemCardDescSection = styled.section`
  margin: 5rem 0;
`;

export const ItemCardDescTitle = styled.h3`
  margin: 0 0 2rem;
  font-size: 3rem;
  font-weight: 700;
  text-transform: capitalize;
`;
export const ItemCardDescTable = styled(Table)`
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
