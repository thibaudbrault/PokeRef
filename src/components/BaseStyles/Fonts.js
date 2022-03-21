import { createGlobalStyle } from 'styled-components';

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 400;
        src: url('../Fonts/quicksand-v28-latin-regular.woff');
        src: url('../Fonts/quicksand-v28-latin-regular.woff2');
    }

    @font-face {
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 700;
        src: url('../Fonts/quicksand-v28-latin-700.woff');
        src: url('../Fonts/quicksand-v28-latin-700.woff2');
    }

    @font-face {
        font-family: 'Press Start 2P';
        font-style: normal;
        font-weight: 400;
        src: url('../Fonts/press-start-2p-v12-latin-regular.woff');
        src: url('../Fonts/press-start-2p-v12-latin-regular.woff2');
    }
`