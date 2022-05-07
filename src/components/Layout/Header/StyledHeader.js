import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../BaseStyles/Sizing';

export const HeaderContainer = styled.header`
	padding: 3rem 0;
	display: flex;
	align-items: center;
	justify-content: center;

	@media ${device.md} { 
		& img {
			width: 16px;
			height: 16px;
		}
	}
`;

export const HeaderBtn = styled.button`
	width: 32px;
	height: 32px;
	background: none;
	border: none;

	@media ${device.md} { 
		width: 16px;
		height: 16px;
	}
`;

export const HeaderLink = styled(Link)`
	width: 32px;
	height: 32px;
	
	@media ${device.md} { 
		width: 16px;
		height: 16px;
	}
`;
