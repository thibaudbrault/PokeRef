import React from 'react';

import { H1 } from '../../BaseStyles/Headings';
import {
	HeaderBtnContainer,
	HeaderBtnTheme,
	HeaderContainer,
} from './StyledHeader';

const Header = ({ themeToggler }) => {
	return (
		<HeaderContainer id='header'>
			<H1>PokéInfo</H1>
			<HeaderBtnContainer>
				<button>Sign In</button>
				<button>Sign Up</button>
				<HeaderBtnTheme
					onClick={themeToggler}
					aria-label='Switch Theme'
				></HeaderBtnTheme>
			</HeaderBtnContainer>
		</HeaderContainer>
	);
};

export default Header;
