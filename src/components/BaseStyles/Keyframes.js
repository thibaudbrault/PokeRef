import { keyframes } from 'styled-components';

export const Pulse = keyframes`
    0% { transform: scale(1.01); }
    50% { transform: scale(0.99); }
    100% { transform: scale(1.01); }
`;

export const Wiggle = keyframes`
    0% {transform: rotate(0deg);}
    80% {transform: rotate(0deg);}
    85% {transform: rotate(5deg);}
    95% {transform: rotate(-5deg);}
    100% {transform: rotate(0deg);}
`;