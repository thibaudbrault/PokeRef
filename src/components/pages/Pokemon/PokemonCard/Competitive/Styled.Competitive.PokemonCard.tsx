import styled from 'styled-components';

export const PokemonSetsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & li {
    max-width: 1100px;

    &:first-of-type {
      margin-bottom: 1rem;
    }

    &:last-of-type {
      margin-top: 1rem;
    }
  }
`;

export const PokemonSetSpecs = styled.div`
  display: grid;
  align-items: stretch;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.main};
  border-radius: 5px;

  & ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & li {
      font-size: 2rem;

      & b {
        font-weight: 600;
      }
    }
  }
`;

export const PokemonSetDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.7rem;

  & h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  & hr {
    border-width: 0 0 1px 0;
  }
`;

export const PokemonSetComment = styled(PokemonSetDesc)`
  & h1 {
    margin: 1rem 0 0;
    font-size: 2.5rem;
    font-weight: 600;
    text-transform: capitalize;
  }
`;
