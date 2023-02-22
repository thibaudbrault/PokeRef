import { Wiggle } from '@/components/common/styles/Animations';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';
import { Search } from '../../common/styles/Inputs';
import { device } from '../../common/styles/Sizing';

export const PokedexSearch = styled(Search)`
  align-items: stretch;
  gap: 1rem;

  @media ${device.md} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'search search search'
      'form generation type';
    row-gap: 2rem;
    column-gap: 4rem;
  }

  @media ${device.xs} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'search .'
      'generation type';
  }
`;

export const PokedexDropdown = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;

  & label {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    justify-self: flex-start;
  }
`;

export const PokedexVerticalText = styled.p`
  @supports (writing-mode: sideways-rl) {
    display: block;
    writing-mode: sideways-rl;
  }
  display: none;
  font-size: 7rem;
  color: ${({ theme }) => theme.secondary};
  position: fixed;
  top: 50%;
  right: 5%;
  transform: translate(-50%, -50%);

  @media ${device.xl} {
    display: none;
  }
`;

export const PokedexList = styled(motion.ul)`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const PokedexElement = styled(motion.li)`
  width: 21rem;
  height: 32rem;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid transparent;
  border-radius: 25px;
  text-align: center;
  transition: 0.3s ease-in-out;

  & h2 {
    font-size: 1.5rem;
    font-family: 'Press Start 2P';
    text-transform: capitalize;

    & a {
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: ${({ theme }) => theme.red};
      }
    }

    @media ${device.sm} {
      font-size: 1.3rem;
    }
  }

  & p {
    font-size: 1.3rem;
  }

  &:nth-child(even) {
    &:hover {
      border-radius: 10px 50px;

      @media ${device.sm} {
        border-radius: 7px 35px;
      }
    }
  }

  &:nth-child(odd) {
    &:hover {
      border-radius: 50px 10px;

      @media ${device.sm} {
        border-radius: 7px 35px;
      }
    }
  }

  @media ${device.sm} {
    width: 20rem;
    height: 29rem;
    padding: 1.5rem 2.5rem;
  }
`;

export const SpriteNormal = styled(ImageWithFallback)`
  position: relative;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
`;

export const SpriteShiny = styled(ImageWithFallback)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: 0.3s ease-in-out;
`;

export const PokedexImage = styled.div`
  position: relative;
  margin: 0 auto;

  &:hover ${SpriteShiny} {
    opacity: 1;
    z-index: 99;
  }

  & img {
    @media ${device.sm} {
      width: 72px;
      height: 72px;
    }
  }
`;

export const LoadingImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const PokedexTypes = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.3rem;

  & div {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.5rem;
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
      justify-content: center;
      gap: 0.5rem;

      & img {
        cursor: pointer;
      }

      & span {
        font-family: 'Press Start 2P';
        cursor: pointer;
      }
    }
  }

  @media ${device.sm} {
    font-size: 1rem;
  }
`;

export const ToBottom = styled.a`
  padding: 0.5rem;
  display: flex;
  position: fixed;
  right: 5rem;
  bottom: 5rem;
  font-size: 5rem;
  border-radius: 50%;
  background-color: rgba(140, 140, 140, 0.2);
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.main};
    background: ${({ theme }) => theme.secondary};
  }

  @media ${device.sm} {
    right: 3rem;
    bottom: 3rem;
    font-size: 3rem;
  }
`;

export const PokemonTitle = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;

  & h2 {
    margin-bottom: 0;
  }

  & button {
    background: none;
    border: none;

    & svg {
      font-size: 4rem;
      & path {
        fill: ${({ theme }) => theme.main};
        stroke: ${({ theme }) => theme.secondary};
        stroke-width: 1;
      }
    }
  }
`;
