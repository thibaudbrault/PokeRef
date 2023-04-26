import styled from 'styled-components';
import { device } from '@/components/common/styles/Sizing';

export const PokemonSpritesDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 3rem;
  align-items: center;
  justify-items: center;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & p {
      margin-top: 1rem;
      font-size: 1.5rem;
    }
  }

  @media ${device.xs} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
