import styled from 'styled-components';
import { Subtitle } from '../../../common/styles/Headings';
import { Table, TBold } from '../../../common/styles/Table';

export const TypeDamageSection = styled.section`
  margin: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  & table {
    & tr {
      height: 100px;

      & th {
        width: 33%;
      }

      & td {
        text-align: left;
      }
    }
  }
`;

export const TypeDamageTable = styled(Table)`
  width: 100%;
  height: 100%;
  margin-top: 0.5rem;

  & tr {
    border: 1px solid rgba(130, 130, 130, 0.2);
    border-left: none;
    border-right: none;

    & th {
      background: rgba(130, 130, 130, 0.2);
      font-size: 1.5rem;
    }

    & td {
      height: 100px;

      & div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1.5rem;

        & a {
          width: 32px;
          height: 32px;
          cursor: pointer;

          & img {
            cursor: pointer;
          }
        }
      }
    }

    &:nth-of-type(4) {
      border-bottom: 5px solid rgba(130, 130, 130, 0.2);
    }
  }

  &:first-of-type {
    margin-bottom: 5rem;
  }
`;

export const TypeListSubtitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

export const TypeListSubtitle = styled(Subtitle)`
  text-transform: none;
  text-align: left;
`;

export const TypeMovesName = styled(TBold)`
  & a {
    border-bottom: 1px solid transparent;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.secondary};
    }
  }
`;

export const TypeMovesData = styled.td`
  text-align: center;
  text-transform: capitalize;
`;

export const TypeMovesComment = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin: 0.75rem 0 0;
`;
