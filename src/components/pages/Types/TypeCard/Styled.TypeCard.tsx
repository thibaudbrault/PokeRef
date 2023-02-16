import styled from 'styled-components';
import { Subtitle } from '../../../common/styles/Headings';
import { device } from '../../../common/styles/Sizing';
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
          cursor: pointer;
        }
      }
    }
  }

  &:first-of-type {
    margin-bottom: 5rem;
  }
`;

export const TypeListSubtitle = styled(Subtitle)`
  text-transform: none;
`;

export const TypePokemonList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  & li {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 3rem;
    width: 21rem;
    height: 32rem;
    padding: 2rem 3rem;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    font-size: 1.5rem;
    text-align: center;
    border: 1px solid transparent;
    transition: 0.3s ease-in-out;

    & p {
      font-size: 1.5rem;
    }

    & a {
      font-size: 1.5rem;
      font-family: 'Press Start 2P';
      text-transform: capitalize;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.red};
      }
    }

    &:hover {
      border: 1px solid ${({ theme }) => theme.red};
    }

    @media ${device.sm} {
      width: 18rem;
      height: 27rem;
      margin: 2rem;
      padding: 1.5rem 2.5rem;
    }
  }
`;

export const TypeMovesTable = styled(Table)`
  width: 100%;
  margin: 3rem auto 0;

  @media ${device.md} {
    width: auto;
  }
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
