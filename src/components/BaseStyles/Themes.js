import React from 'react';
import { ThemeProvider } from 'styled-components';

export const Themes = {
    colors: {
        light: '#c4c4c4',
        dark: '#161616',
        red: '#cc0000',
        purple: '#5e318f'
    }
}

export const Theme = ({ children }) => (
    <ThemeProvider theme={Themes}>{children}</ThemeProvider>
);