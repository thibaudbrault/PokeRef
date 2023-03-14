import { TypeDamageTable } from '@/components/pages/Types/TypeCard/Styled.TypeCard';
import styled from 'styled-components';

export const PokemonTypesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;

export const PokemonTypesTable = styled(TypeDamageTable)`
  height: auto;
  & tr {
    & td {
      height: auto;
    }

    &:nth-of-type(3) {
      border-bottom: 1px solid rgba(130, 130, 130, 0.2);
    }
  }

  &:first-of-type {
    margin-bottom: 0;
  }
`;
