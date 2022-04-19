import { keyframes } from 'styled-components';

export const Pulse = keyframes`
    0% { transform: scale(1.01); }
    50% { transform: scale(0.99); }
    100% { transform: scale(1.01); }
`;
