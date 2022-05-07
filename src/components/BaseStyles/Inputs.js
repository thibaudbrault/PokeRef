import styled from 'styled-components';
import { device } from './Sizing';

export const Search = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
	margin-bottom: 5rem;
`;

export const Input = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	& label {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	& input {
		width: 15vw;
		min-width: 15rem;
		padding: 0.5rem 1rem;
		color: ${({ theme }) => theme.secondary};
		background: transparent;
		border: 1px solid ${({ theme }) => theme.secondary};
		border-radius: 5px;
		transition: 0.3s ease-in-out;

		&:focus {
			outline: none;
			border: 1px solid ${({ theme }) => theme.red};
		}
		&::placeholder {
			color: ${({ theme }) => theme.secondary};
			opacity: 0.8;
		}
	}
`;

export const ModifiedSearch = styled(Search)`
	justify-content: flex-start;
`;

export const BackButton = styled.button`
	padding: 1rem 1.5rem;
	font-size: 1.5rem;
	font-weight: 700;
	background: none;
	color: ${({ theme }) => theme.secondary};
	border: 1px solid ${({ theme }) => theme.secondary};
	border-radius: 5px;
	transition: 0.3s ease-in-out;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.secondary};
		color: ${({ theme }) => theme.main};
		border: 1px solid ${({ theme }) => theme.main};
	}
`;
