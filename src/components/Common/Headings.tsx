import styled from 'styled-components';
import { device } from './Sizing';

export const LazyLoad = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	color: ${({ theme }) => theme.secondary};
	background-color: ${({ theme }) => theme.main};

	& p {
		font-size: 4rem;
		font-weight: 700;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const H1 = styled.h1`
	padding: 0 1rem;
	font-family: 'Press Start 2P';
	font-size: 6rem;
	letter-spacing: 3px;
	color: ${({ theme }) => theme.main};
	text-shadow: ${({ theme }) => theme.secondary} -2px -2px 0px,
		${({ theme }) => theme.secondary} 2px -2px 0px,
		${({ theme }) => theme.secondary} -2px 2px 0px,
		${({ theme }) => theme.secondary} 2px 2px 0px;

	@media ${device.lg} {
		font-size: 5rem;
	}

	@media ${device.md} {
		font-size: 4.5rem;
	}

	@media ${device.sm} {
		font-size: 3.7rem;
	}

	@media ${device.xs} {
		font-size: 3rem;
	}
`;

export const Title = styled.h2`
	margin-bottom: 1.5rem;
	font-size: 4rem;
	font-family: 'Press Start 2P';
	color: #c4c4c4;
	text-transform: capitalize;
	text-align: center;
	color: ${({ theme }) => theme.main};
	text-shadow: ${({ theme }) => theme.secondary} -1px -1px 0px,
		${({ theme }) => theme.secondary} 1px -1px 0px,
		${({ theme }) => theme.secondary} -1px 1px 0px,
		${({ theme }) => theme.secondary} 1px 1px 0px;
`;

export const LeftTitle = styled(Title)`
	text-align: left;
`;

export const CardTitle = styled(Title)`
	margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
	font-size: 1.5rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	text-align: center;
`;

export const H2 = styled.h2`
	margin: 0 0 1rem;
	font-size: 4.5rem;
	font-weight: 700;
	text-transform: capitalize;
	text-align: center;
`;

export const H3 = styled.h3`
	margin: 0 0 1rem;
	font-size: 3.5rem;
	font-weight: 700;
	text-transform: capitalize;
`;

export const H4 = styled.h4`
	margin: 0 0 1rem;
	font-size: 2.5rem;
	font-weight: 700;
	text-transform: capitalize;
`;

export const Span = styled.span`
	text-transform: capitalize;
`;
