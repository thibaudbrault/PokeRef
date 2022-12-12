import styled from 'styled-components';
import Link from 'next/link';

export const TableContainer = styled.div`
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
  }

  & td {
    min-width: 200px;
    padding: 1.5rem;
    font-size: 1.5rem;
    border: 1px solid rgba(130, 130, 130, 0.2);
    border-collapse: collapse;
    border-left: none;
    border-right: none;
    vertical-align: middle;
  }
`;

export const ModifiedTable = styled(Table)`
  width: 100%;
`;

export const THead = styled.thead`
  color: #c4c4c4;
  background: #161616;
  font-size: 1.7rem;
  font-weight: 700;
  text-transform: capitalize;
`;

export const TRow = styled.tr`
  &:hover {
    background: rgba(130, 130, 130, 0.2);
  }
`;

export const TName = styled.td`
  text-transform: capitalize;
  font-size: 1.7rem;
  font-weight: 700;
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
    font-weight: 700;
  }
`;

export const TEffect = styled.td`
  text-align: center;

  & span {
    display: none;
    &:first-child {
      display: block;
    }
  }
`;
