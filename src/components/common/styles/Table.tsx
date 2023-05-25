import Link from 'next/link';
import styled from 'styled-components';

export const TableContainer = styled.section`
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 1rem;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.main};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(130, 130, 130, 0.2);
  }

  & td {
    min-width: 200px;
  }
`;

export const Table = styled.table`
  display: table;
  text-align: center;
  border: 1px solid rgba(130, 130, 130, 0.2);
  border-collapse: collapse;
  border-left: none;
  border-right: none;
  table-layout: fixed;

  & th {
    padding: 1.5rem;
    font-size: 1.5rem;
    border: 1px solid rgba(130, 130, 130, 0.2);
    border-collapse: collapse;
    vertical-align: middle;

    & .cursor-pointer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
    }
  }

  & td {
    padding: 1.5rem;
    font-size: 1.5rem;
    border-top: 1px solid rgba(130, 130, 130, 0.2);
    border-bottom: 1px solid rgba(130, 130, 130, 0.2);
    border-left: none;
    border-right: none;
    vertical-align: middle;
  }

  & tfoot {
    display: none;
    text-align: center;

    & tr {
      & td {
        font-size: 2.5rem;
        font-weight: 600;
      }
    }
  }

  & tbody:empty + tfoot {
    display: table-footer-group;
  }
`;

export const FullWidthTable = styled(Table)`
  width: 100%;
`;

export const THead = styled.thead`
  & th {
    color: ${({ theme }) => theme.secondary};
    font-size: 1.7rem;
    font-weight: 600;
    text-transform: capitalize;
    background: rgba(130, 130, 130, 0.2);
  }
`;

export const TRow = styled.tr`
  &:hover {
    background: rgba(130, 130, 130, 0.2);
  }
`;

export const TCapitalize = styled.td`
  text-transform: capitalize;
`;

export const TBold = styled.td`
  text-transform: capitalize;
  font-size: 1.7rem;
  font-weight: 600;
`;

export const TLink = styled(Link)`
  text-transform: capitalize;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
  }

  &.bold {
    font-weight: 600;
  }
`;

export const TCategory = styled.td`
  & div {
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
      text-transform: capitalize;
      padding-left: 0.5rem;
    }
  }
`;

export const TType = styled.td`
  & div {
    width: fit-content;
    margin: 0 auto;
    padding: 0.5rem 1.5rem;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;

      & img {
        cursor: pointer;
      }
      & span {
        font-family: 'Oswald', sans-serif;
        font-size: 1.7rem;
        color: ${({ theme }) => theme.secondary};
        text-shadow: ${({ theme }) => theme.main} -1px -1px 0px,
          ${({ theme }) => theme.main} 1px -1px 0px,
          ${({ theme }) => theme.main} -1px 1px 0px,
          ${({ theme }) => theme.main} 1px 1px 0px;
        cursor: pointer;
      }
    }
  }
`;

export const TEffect = styled.td`
  text-align: start;

  & span {
    display: block;
  }
`;
