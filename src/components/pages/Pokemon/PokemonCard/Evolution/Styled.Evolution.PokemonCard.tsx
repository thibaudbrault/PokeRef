import styled from 'styled-components';
import { device, Section } from '../../../../common/styles/Sizing';

export const PokemonEvolutionSection = styled(Section)`
  @media ${device.sm} {
    padding-bottom: 0;
  }
`;

export const PokemonEvolutionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div:only-child {
    width: 100%;
  }

  @media ${device.sm} {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }
`;

export const PokemonEvolutionBase = styled.div`
  text-align: center;
  width: 20%;

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    & a {
      font-size: 2rem;
      font-weight: 600;
      text-transform: capitalize;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.red};
      }
    }
  }
`;

export const PokemonEvolution = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;

  @media ${device.sm} {
    justify-content: space-around;
    flex-direction: column;
  }
`;

export const PokemonEvolutionStages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PokemonEvolutionFinal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PokemonEvolutionElement = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;

  & div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    & a {
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
      text-transform: capitalize;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.red};
      }
    }

    & svg {
      font-size: 2.7rem;

      @media ${device.sm} {
        transform: rotate(90deg);
      }
    }
  }

  @media ${device.sm} {
    flex-direction: column;

    & div {
      width: auto;
    }
  }
`;

export const PokemonEvolutionText = styled.p`
  font-size: 1.7rem;
  text-align: center;

  & span {
    font-weight: 600;
    text-transform: capitalize;
  }
`;
