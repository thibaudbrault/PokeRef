import styled from 'styled-components';
import { TypeDamageTable } from '@/modules/types/type/Styled.TypeCard';
import { PokedexTypes } from '@/modules/pokedex/Styled.Pokemon';

export const PokemonTypesList = styled(PokedexTypes)`
  width: fit-content;
  flex-direction: row;
  margin-bottom: 1rem;
  gap: 2rem;

  & div {
    padding: 0.5rem 1.5rem;
    font-size: 2rem;
  }
`;

export const PokemonTypesTable = styled(TypeDamageTable)`
  height: auto;
  width: 100%;
  & tr {
    & td {
      height: auto;
    }

    &:nth-of-type(4) {
      border-bottom: 1px solid rgba(130, 130, 130, 0.2);
    }
  }

  &:first-of-type {
    margin-bottom: 0;
  }
`;
