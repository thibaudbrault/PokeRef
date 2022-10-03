import React from 'react';

import { H1 } from '/components/BaseStyles/Headings';
import {
	HeaderBtnContainer,
	HeaderBtnTheme,
	HeaderContainer,
} from './StyledHeader';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import Link from 'next/link';

function Header({ themeToggler, theme }) {
	return (
		<HeaderContainer id='header'>
			<H1>PokéRef</H1>
			<HeaderBtnContainer>
				<HeaderBtnTheme onClick={themeToggler} aria-label='Switch Theme'>
					{theme === 'dark' ? <BsSun /> : <BsMoonStars />}
				</HeaderBtnTheme>
			</HeaderBtnContainer>
		</HeaderContainer>
	);
}

export default Header;
