// @ts-nocheck

import { createGlobalStyle } from 'styled-components';
import { device } from './Sizing';

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
    dl, dt, dd, ul, ul, li,
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
    }

    button {
        cursor: pointer;
    }

    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    ul, ul {
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
        font-family: 'Quicksand', serif;
        font-weight: 400;
        
        & #nprogress {
            & .bar {
                background: hsla(29, 92%, 70%, 1);
                background: linear-gradient(
                    0deg,
                    hsla(29, 92%, 70%, 1) 0%,
                    hsla(0, 87%, 73%, 1) 100%
                );
                background: -moz-linear-gradient(
                    0deg,
                    hsla(29, 92%, 70%, 1) 0%,
                    hsla(0, 87%, 73%, 1) 100%
                );
                background: -webkit-linear-gradient(
                    0deg,
                    hsla(29, 92%, 70%, 1) 0%,
                    hsla(0, 87%, 73%, 1) 100%
                );
            }

            & .spinner-icon {
                display: none;
            }
        }
    }

    h1, h2, h3, h4, h5, h6, nav {
        font-family: 'Oswald', sans-serif;
    }

    @media ${device.md} {
        html {
            font-size: 9px;
        }
    }

    @media ${device.sm} {
        html {
            font-size: 8px;
        }
    }

    @media ${device.xs} {
        html {
            font-size: 7px;
        }
    }

    .ReactModal__Overlay {
        width: 100vw;
        height: 100vh;
        background-color: ${({ theme }) => theme.secondary} !important;
        z-index: 4;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;

        &--after-open {
            opacity: 1;
        }

        &--before-close {
            opacity: 0;
        }
    }
`;
