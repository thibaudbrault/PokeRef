import React from 'react';

import { H1 } from '/components/BaseStyles/Headings';
import {
	HeaderBtnContainer,
	HeaderBtnTheme,
	HeaderContainer,
} from './StyledHeader';
import RiMoonClearLine from '@meronex/icons/ri/RiMoonClearLine';
import RiSunLine from '@meronex/icons/ri/RiSunLine';

function Header({ themeToggler, theme }) {
	return (
		<HeaderContainer id='header'>
			<H1>PokéRef</H1>
			<HeaderBtnContainer>
				<HeaderBtnTheme onClick={themeToggler} aria-label='Switch Theme'>
					{theme === 'dark' ? <RiSunLine /> : <RiMoonClearLine />}
				</HeaderBtnTheme>
			</HeaderBtnContainer>
		</HeaderContainer>
	);
}

export default Header;
