import { createGlobalStyle } from 'styled-components';
import QuicksandWoff from '../Fonts/quicksand-v28-latin-regular.woff';
import QuicksandWoff2 from '../Fonts/quicksand-v28-latin-regular.woff2';
import QuicksandBoldWoff from '../Fonts/quicksand-v28-latin-700.woff';
import QuicksandBoldWoff2 from '../Fonts/quicksand-v28-latin-700.woff2';
import PressStart2PWoff from '../Fonts/press-start-2p-v12-latin-regular.woff';
import PressStart2PWoff2 from '../Fonts/press-start-2p-v12-latin-regular.woff2';

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 400;
        src: url(${QuicksandWoff}) format(woff),
             url(${QuicksandWoff2}) format(woff2);
    }

    @font-face {
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 700;
        src: url(${QuicksandBoldWoff}) format(woff),
             url(${QuicksandBoldWoff2}) format(woff2);
    }

    @font-face {
        font-family: 'Press Start 2P';
        font-style: normal;
        font-weight: 400;
        src: url(${PressStart2PWoff}) format(woff),
             url(${PressStart2PWoff2}) format(woff2);
    }
`