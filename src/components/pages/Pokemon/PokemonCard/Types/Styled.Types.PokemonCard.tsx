import { TypeDamageTable } from '@/components/pages/Types/TypeCard/Styled.TypeCard';
import styled from 'styled-components';
import { PokedexTypes } from '../../Styled.Pokemon';

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
