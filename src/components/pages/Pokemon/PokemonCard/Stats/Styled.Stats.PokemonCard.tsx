import { device } from '@/components/common/styles/Sizing';
import styled from 'styled-components';

export const PokemonStatsCircles = styled.div`
  margin: 3rem 0 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  height: 15rem;

  & .CircularProgressbar {
    height: 100%;

    &-trail {
      stroke: ${({ theme }) => theme.secondary};
    }

    &-path {
      stroke: ${({ theme }) => theme.red};
    }

    &-text {
      fill: ${({ theme }) => theme.secondary};
      font-size: 1.3rem;
      stroke-width: 0.4;
    }
  }

  @media ${device.lg} {
    height: 30rem;
    row-gap: 3rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.sm} {
    height: 45rem;
    row-gap: 4rem;
    grid-template-columns: 1fr 1fr;

    & .CircularProgressbar {
      &-text {
        font-size: 2rem;
      }
    }
  }
`;

export const PokemonStatsTotal = styled.p`
  margin: 2rem 0;
  font-size: 1.7rem;
`;
