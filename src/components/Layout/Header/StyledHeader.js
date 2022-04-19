import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
	padding: 3rem 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const HeaderBtn = styled.button`
	width: 32px;
	height: 32px;
	background: none;
	border: none;
`;

export const HeaderLink = styled(Link)`
	width: 32px;
	height: 32px;
`;
