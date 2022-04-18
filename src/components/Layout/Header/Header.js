import React from 'react';

import { H1 } from '../../BaseStyles/Headings';
import { HeaderBtn, HeaderContainer, HeaderLink } from './StyledHeader';

const Header = ({themeToggler}) => {
    return (
        <HeaderContainer id='header'>
            <img src="https://www.pokepedia.fr/images/8/87/Pok%C3%A9_Ball.png" alt="poke ball" />
            <img src="https://www.pokepedia.fr/images/a/aa/Super_Ball.png" alt="super ball" />
            <img src="https://www.pokepedia.fr/images/d/da/Hyper_Ball.png" alt="hyper ball" />
            <H1>PokéInfo</H1>
            <HeaderBtn onClick={themeToggler}>
                <img src="https://www.pokepedia.fr/images/4/4f/Sombre_Ball.png" alt="sombre ball" />
            </HeaderBtn>
            <HeaderLink
                to={`/pikachu`}
            >
                <img src="https://www.pokepedia.fr/images/f/fd/Rapide_Ball.png" alt="rapide ball" />
            </HeaderLink>
            <img src="https://www.pokepedia.fr/images/1/18/Luxe_Ball.png" alt="luxe ball" />
        </HeaderContainer>
    )
}

export default Header