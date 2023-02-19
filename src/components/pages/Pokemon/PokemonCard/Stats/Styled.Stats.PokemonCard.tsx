import { Table } from '@/components/common/styles/Table';
import styled from 'styled-components';
import { device } from '@/components/common/styles/Sizing';
import { TypeDamageTable } from '@/components/pages/Types/TypeCard/Styled.TypeCard';

export const PokemonStatsSection = styled.section`
  margin-bottom: 5rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media ${device.lg} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & div {
      width: 100%;
    }
  }
`;

export const PokemonStatsText = styled.td`
  padding: 1rem;
  font-size: 1.5rem;
  text-transform: capitalize;
  vertical-align: middle;
`;

export const PokemonStatsBars = styled.td`
  width: 100%;
  min-width: 150px;
  vertical-align: middle;

  & div {
    position: relative;
    width: 100%;
    height: 12px;
    background: ${({ theme }) => theme.main};
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 40px;

    & span {
      max-width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 10px;
      background: ${({ theme }) => theme.secondary};
      border-radius: 40px;
    }
  }
`;

export const PokemonStatsTotal = styled.td`
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  vertical-align: middle;
`;

export const PokemonTypesContainer = styled.div`
  @media ${device.sm} {
    width: 100%;
    margin-top: 1rem;
  }
`;

export const PokemonTypesTable = styled(TypeDamageTable)`
  & tr {
    &:nth-of-type(3) {
      border-bottom: 1px solid rgba(130, 130, 130, 0.2);
    }
  }
`;
