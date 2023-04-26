import { device } from '@/components/common/styles/Sizing';
import styled from 'styled-components';
import Modal from 'react-modal';

export const PokemonCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 4rem;
  padding-top: 2rem;

  & li {
    text-align: center;
    font-size: 1.7rem;

    & button {
      background: none;
      border: none;

      & img {
        cursor: zoom-in;
        transition: 0.3s ease-in-out;

        &:hover {
          transform: scale(1.02);
        }
      }
    }
  }

  @media ${device.md} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.sm} {
    & img {
      width: 150px;
      height: 210px;
    }
  }
`;

export const PokemonCardModal = styled(Modal)`
  width: 60%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  overflow-y: hidden !important;

  @media ${device.sm} {
    width: 80%;
  }
`;
