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

export const PokemonSetDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.7rem;

  & h1 {
    font-size: 2rem;
    font-weight: 500;
  }

  & hr {
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 50px;
  }
`;

export const PokemonSetComment = styled(PokemonSetDesc)`
  & h1 {
    margin: 1rem 0 0;
    font-size: 2.5rem;
    font-weight: 700;
    text-transform: capitalize;
  }
`;
