import styled from 'styled-components';
import { Wiggle } from './Keyframes';

export const LoadingImg = styled.div`
	position: relative;
	width: 100%;
	height: 48px;
	margin-top: 1rem;

	& img {
		position: absolute;
		left: 50%;
		margin-left: -24px;
		transform: translateX(-50%);
		animation: ${Wiggle} 2s infinite;
		text-align: center;
		font-size: 1.7rem;
		font-weight: 700;
	}
`;
