import styled from 'styled-components';
import { Pulse } from '../../../../common/styles/Animations';
import { device, Section } from '../../../../common/styles/Sizing';
import { Table } from '../../../../common/styles/Table';

export const PokemonDataSection = styled(Section)`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 55% 45%;
  gap: 3rem;

  @media ${device.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
  }
`;

export const PokemonCatchButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const PokemonDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PokemonDataSprite = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const PokemonDataDesc = styled.li`
  font-size: 2rem;

  & p {
    padding-top: 0.5rem;
    font-size: 1.3rem;
  }
`;

export const PokemonDataTypes = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & div {
    margin: 2rem;
    margin-left: 0;
    padding: 0 1.5rem;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    color: #c4c4c4;
    border: 1px solid rgba(22, 22, 22, 0.2);
    cursor: pointer;

    & a {
      display: flex;
      align-items: center;
      font-family: 'Oswald';
      font-size: 3rem;

      & img {
        cursor: pointer;
      }

      & span {
        padding-left: 0.5rem;
        cursor: pointer;
      }
    }
  }

  @media ${device.sm} {
    justify-content: center;
  }
`;

export const PokemonDataOldTypes = styled.li`
  font-size: 1.7rem;

  & span {
    text-transform: capitalize;

    &:not(:first-of-type) {
      font-weight: 600;
    }
  }
`;

export const PokemonDataTable = styled(Table)`
  width: 90%;

  & th {
    background: rgba(130, 130, 130, 0.2);
    text-transform: capitalize;
  }

  & td {
    font-size: 1.7rem;
    font-weight: 600;
    text-align: left;
    text-transform: capitalize;

    & ul {
      margin-left: 2rem;
      & li {
        list-style-type: decimal;
        text-align: left;
      }
    }
  }
`;

const PokemonDataPill = styled.span`
  margin: 1rem 0 0;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  font-size: 1.7rem;
  transition: 0.3s ease-in-out;
`;

export const PokemonDataSpecial = styled(PokemonDataPill)`
  border: 1px solid ${({ theme }) => theme.purple};
  background: ${({ theme }) => theme.purple};
  color: #c4c4c4;
`;

export const PokemonDataImg = styled.img`
  animation: ${Pulse} 5s infinite;

  @media ${device.sm} {
    width: 75%;
    margin-bottom: 1rem;
  }
`;
