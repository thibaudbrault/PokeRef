import styled from 'styled-components';
import { Wiggle } from '../../CommonStyles/Keyframes';

export const LoadingImg = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 1rem 0 0;

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -96px;
    margin-left: -96px;
    transform: translateX(-50%);
    animation: ${Wiggle} 2s infinite;
    text-align: center;
    font-size: 1.7rem;
    font-weight: 700;
  }
`;

export const SmallLoadingImg = styled(LoadingImg)`
  margin: 3rem 0;
  height: 48px;

  & img {
    margin-top: -24px;
    margin-left: -24px;
  }
`;
