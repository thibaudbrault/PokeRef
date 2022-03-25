import { createGlobalStyle } from 'styled-components';

export const Reset = createGlobalStyle`

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
        cursor: default;
    }

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    button {
        cursor: pointer;
    }

    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    html {
        font-size: 10px;
        line-height: 1.5;
    }

    body {
        color: ${({ theme }) => theme.secondary};
        background-color: ${({ theme }) => theme.main};
        background-image: ${({ theme }) => theme.background};
        font-family: 'Quicksand', sans-serif;
        font-weight: 400;
        transition: all 0.3s ease-in-out;
    }

    main {
        min-height: 100vh;
    }
`