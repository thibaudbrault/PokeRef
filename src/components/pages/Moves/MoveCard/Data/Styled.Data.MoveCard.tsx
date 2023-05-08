import styled from 'styled-components';
import { device, Section } from '@/components/common/styles/Sizing';
import { Table, TType } from '@/components/common/styles/Table';

export const MoveCardDataSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  column-gap: 3rem;

  @media ${device.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
  }
`;

export const MoveCardDataTable = styled(Table)`
  & th {
    background: rgba(130, 130, 130, 0.2);
  }

  & td {
    font-size: 1.7rem;
    font-weight: 600;
    text-align: left;
    text-transform: capitalize;
  }

  @media ${device.sm} {
    width: 100%;
  }
`;

export const MoveCardDataType = styled(TType)`
  & div {
    margin: 0;
  }
`;

export const MoveCardDataCategory = styled.td`
  & div {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & img {
      vertical-align: middle;

      @media ${device.sm} {
        width: 25px;
        height: 25px;
      }
    }

    & span {
      text-transform: capitalize;
      padding-left: 0.5rem;
      vertical-align: middle;
    }
  }
`;

export const MoveCardDataList = styled.ul`
  margin-top: 2rem;

  & li {
    margin: 0 0 2rem;
  }

  @media ${device.sm} {
    width: 100%;
    margin: 0 0 2rem;
  }
`;

export const MoveCardDataText = styled.p`
  font-size: 1.7rem;
`;

export const MoveCardDataMeta = styled.ul`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

export const MoveCardDataStat = styled.ul`
  margin-left: 2rem;
  font-size: 1.5rem;
`;

export const MoveCardDataTarget = styled.p`
  text-transform: capitalize;
  margin-left: 2rem;
  font-size: 1.5rem;
`;
