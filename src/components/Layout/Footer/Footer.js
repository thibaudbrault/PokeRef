import React from 'react';
import {
	FooterContainer,
	FooterInner,
	LeftFooter,
	CenterFooter,
	RightFooter,
} from './StyledFooter';

const Footer = () => {
	return (
		<FooterContainer>
			<FooterInner>
				<LeftFooter>
					Created by Thibaud Brault
					<br />
					Powered by PokéApi
				</LeftFooter>
				<CenterFooter>PokéRef</CenterFooter>
				<RightFooter>
					<a href='#header'>
						<i className='fas fa-arrow-up'></i>
					</a>
				</RightFooter>
			</FooterInner>
		</FooterContainer>
	);
};

export default Footer;
