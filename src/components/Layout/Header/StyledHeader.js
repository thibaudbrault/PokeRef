import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../BaseStyles/Sizing';

export const HeaderContainer = styled.header`
	width: 80%;
	margin: 0 auto;
	padding: 3rem 0;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media ${device.md} {
		width: 90%;
	}
`;

export const HeaderBtnContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const HeaderBtnLogin = styled(Link)`
	padding: 0.7rem 1.5rem;
	background: none;
	border: 1px solid ${({ theme }) => theme.secondary};
	border-radius: 5px;
	color: ${({ theme }) => theme.secondary};
	font-size: 1.3rem;
	font-weight: 700;
	cursor: pointer;
`;

export const HeaderBtnCreate = styled(Link)`
	margin: 0 2rem;
	padding: 0.7rem 1.5rem;
	background: ${({ theme }) => theme.secondary};
	border: 1px solid transparent;
	border-radius: 5px;
	color: ${({ theme }) => theme.main};
	font-size: 1.3rem;
	font-weight: 700;
	cursor: pointer;
	transition: 0.3s ease-in-out;

	&:hover {
		background: transparent;
		border-color: ${({ theme }) => theme.secondary};
		color: ${({ theme }) => theme.secondary};
	}
`;

export const HeaderBtnTheme = styled.button`
	width: 3rem;
	background: none;
	border: none;
	color: ${({ theme }) => theme.secondary};
	font-size: 3rem;

	&::before {
		content: '${({ theme }) => theme.toggle}';
	}
`;
