import React from 'react';

import { H1 } from '../../BaseStyles/Headings';
import {
	HeaderBtnContainer,
	HeaderBtnCreate,
	HeaderBtnLogin,
	HeaderBtnTheme,
	HeaderContainer,
} from './StyledHeader';

const Header = ({ themeToggler }) => {
	return (
		<HeaderContainer id='header'>
			<H1>PokéRef</H1>
			<HeaderBtnContainer>
				<HeaderBtnLogin to={`/login`}>Sign In</HeaderBtnLogin>
				<HeaderBtnCreate to={`/register`}>Sign Up</HeaderBtnCreate>
				<HeaderBtnTheme
					onClick={themeToggler}
					aria-label='Switch Theme'
				></HeaderBtnTheme>
			</HeaderBtnContainer>
		</HeaderContainer>
	);
};

export default Header;
