import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../../components/BaseStyles/Sizing';

export const MoveLearnSection = styled.section`
	padding: 0 0 5rem;
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
			width: 96px;
			height: 96px;

			@media ${device.sm} {
				width: 72px;
				height: 72px;
			}
		}

		&:hover {
			border: 1px solid ${({ theme }) => theme.red};
		}
	}
`;

export const MoveText = styled.p`
	margin: 0 0 3rem;
	font-size: 1.5rem;
`;

export const MoveLink = styled(Link)`
	font-weight: 700;
	text-transform: capitalize;
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
	font-size: 1rem;

	& div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-bottom: 1rem;
		padding: 0.5rem;
		font-size: 1.5rem;
		border-radius: 5px;

		& img {
			display: inline-block;
			height: 1.5rem;
			width: 1.5rem;
		}

		& span {
			padding-left: 0.5rem;
			text-transform: capitalize;
		}

		@media ${device.sm} {
			font-size: 1.3rem;
		}
	}
`;
