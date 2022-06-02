import styled from 'styled-components';
import { device } from '../BaseStyles/Sizing';

export const AuthSection = styled.section`
	height: 80vh;
	padding: 5rem 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const AuthContainer = styled.div`
	width: 35%;
	margin: 0 auto;
	padding: 2rem;
	background: ${({ theme }) => theme.secondary};
	color: ${({ theme }) => theme.main};
	border-radius: 5px 5px 0 0;

	& h2 {
		margin-bottom: 2rem;
		font-size: 3.5rem;
		text-align: center;
	}

	@media ${device.sm} {
		width: 95%;
	}
`;

export const AuthInput = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
	margin-bottom: 2rem;

	& label {
		font-size: 1.5rem;
		margin: 0 0 0.5rem 0.5rem;
		text-transform: capitalize;
	}

	& input {
		width: 100%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.4);
		border: 1px solid ${({ theme }) => theme.main};
		border-radius: 5px;

		&:focus {
			border: 1px solid ${({ theme }) => theme.red};
			outline: none;
		}
	}
`;

export const AuthPwd = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 80% 15%;
	column-gap: 5%;
	align-items: center;
	justify-items: center;

	& button {
		height: 30px;
		width: 30px;
		background: #c4c4c4;
		border: none;
		border-radius: 50px;
		cursor: default;

		& img {
			width: 25px;
			height: 25px;
			cursor: pointer;
			/* filter: invert(84%) sepia(19%) saturate(0%) hue-rotate(195deg) brightness(94%) contrast(83%); */
		}
	}
`;

export const AuthBtn = styled.button`
	margin: 0 auto;
	display: flex;
	padding: 1rem 2rem;
	font-size: 1.7rem;
	background: none;
	border: 1px solid ${({ theme }) => theme.main};
	color: ${({ theme }) => theme.main};
	border-radius: 5px;
`;

export const AuthCreate = styled.div`
	width: 35%;
	padding: 2rem;
	background: ${({ theme }) => theme.main};
	color: ${({ theme }) => theme.secondary};
	border: 1px solid ${({ theme }) => theme.secondary};
	border-radius: 0 0 5px 5px;

	& p {
		font-size: 1.3rem;
		text-align: center;

		& a {
			cursor: pointer;
			border-bottom: 1px solid transparent;
			transition: 0.3s ease-in-out;

			&:hover {
				border-bottom: 1px solid ${({ theme }) => theme.secondary};
			}
		}
	}

	@media ${device.sm} {
		width: 95%;
	}
`;

export const ValidateText = styled.p`
	color: ${({ theme }) => theme.red};
	margin: 0.5rem 0 0 0.5rem;
	font-size: 1.3rem;
`;
