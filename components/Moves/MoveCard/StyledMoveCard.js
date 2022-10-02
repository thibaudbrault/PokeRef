import Link from 'next/link';
import styled from 'styled-components';
import { device, Section } from '../../../components/BaseStyles/Sizing';

export const MoveLearnSection = styled(Section)`
	display: ${(props) => (props.visibility ? 'block' : 'none')};
`;

export const MoveList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;

	& li {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 18rem;
		height: 25rem;
		margin: 3rem;
		padding: 2rem 3rem;
		background: rgba(255, 255, 255, 0.4);
		border-radius: 10px;
		font-size: 1.5rem;
		text-align: center;
		border: 1px solid transparent;
		transition: 0.3s ease-in-out;

		& img {
			@media ${device.sm} {
				width: 54px;
				height: 54px;
			}
		}

		&:hover {
			border: 1px solid ${({ theme }) => theme.red};
		}

		@media ${device.sm} {
			width: 14rem;
			height: 21rem;
			margin: 1.5rem;
			padding: 1rem 2rem;
		}
	}

	@media ${device.sm} {
		justify-content: space-evenly;
	}
`;

export const MoveText = styled.p`
	margin: 0 0 3rem;
	font-size: 1.5rem;
`;

export const MoveLink = styled.a`
	font-weight: 700;
	text-transform: capitalize;
	cursor: pointer;
	transition: 0.3s ease-in-out;

	&:hover {
		color: ${({ theme }) => theme.red};
	}
`;

export const MoveTypes = styled.div`
	width: 100%;
	height: 50%;
	margin-top: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-size: 1.5rem;

	& div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 0.5rem;
		border-radius: 5px;

		& img {
			display: inline-block;
		}

		& span {
			padding-left: 0.5rem;
			text-transform: capitalize;
			color: #161616;
		}

		&:first-of-type {
			margin-bottom: 1rem;

			@media ${device.sm} {
				margin-bottom: 0.5rem;
			}
		}
	}

	@media ${device.sm} {
		margin-top: 0.5rem;
		font-size: 1.3rem;
	}
`;
