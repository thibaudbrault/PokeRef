import { Table } from '@/components/common/styles/Table';
import styled from 'styled-components';

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
