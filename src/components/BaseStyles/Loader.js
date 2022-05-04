import styled from 'styled-components';
import { Wiggle } from './Keyframes';

export const LoadingImg = styled.img`
    display: block;
    animation: ${Wiggle} 2.5s infinite;
`;