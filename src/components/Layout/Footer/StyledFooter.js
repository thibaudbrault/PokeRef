import styled from 'styled-components';

export const FooterContainer = styled.footer`
	padding: 1rem 0 0.5rem;
	background: hsla(29, 92%, 70%, 1);
	background: linear-gradient(
		0deg,
		hsla(29, 92%, 70%, 1) 0%,
		hsla(0, 87%, 73%, 1) 100%
	);
	background: -moz-linear-gradient(
		0deg,
		hsla(29, 92%, 70%, 1) 0%,
		hsla(0, 87%, 73%, 1) 100%
	);
	background: -webkit-linear-gradient(
		0deg,
		hsla(29, 92%, 70%, 1) 0%,
		hsla(0, 87%, 73%, 1) 100%
	);
`;

export const FooterInner = styled.div`
	width: 90%;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 30% 40% 30%;
	align-items: center;
	color: #161616;
`;

export const LeftFooter = styled.div`
	justify-self: left;
	font-size: 1.2rem;
`;

export const CenterFooter = styled.div`
	justify-self: center;
	font-size: 2rem;
	font-family: 'Press Start 2P';
	text-align: center;
`;

export const RightFooter = styled.div`
	justify-self: right;
	font-size: 2rem;
`;
