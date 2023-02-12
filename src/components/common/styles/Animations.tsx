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

export const fadeInUpVariant = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: `spring`,
      mass: 1,
      damping: 15,
      stiffness: 200,
    },
  },
  exit: {
    y: 0,
    opacity: 0,
  },
  hover: {
    zIndex: 1,
    scale: [1, 1.05, 1.02],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.2,
    },
  },
  tap: { scale: 0.99 },
};

export const placeholderVariant = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: `easeInOut`,
    },
  },
};
