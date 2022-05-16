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
