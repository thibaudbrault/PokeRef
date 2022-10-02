import Link from 'next/link';
import styled from 'styled-components';
import { device } from '../../BaseStyles/Sizing';

export const HeaderContainer = styled.header`
	width: 80%;
	margin: 0 auto;
	padding: 3rem 0 5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media ${device.md} {
		width: 90%;
	}

	@media ${device.sm} {
		width: 95%;
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

export const HeaderBtnProfile = styled(HeaderBtnLogin)`
	margin: 0 2rem;

	@media ${device.xs} {
		margin-left: 1rem;
	}
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

	@media ${device.xs} {
		margin: 0 1rem;
	}
`;

export const HeaderBtnLogOut = styled.button`
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

	@media ${device.xs} {
		margin-right: 1rem;
	}
`;

export const HeaderBtnTheme = styled.button`
	width: 3rem;
	background: none;
	border: none;
	color: ${({ theme }) => theme.secondary};
	font-size: 3rem;
`;
