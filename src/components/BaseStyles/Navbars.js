import styled from 'styled-components';
import { device } from './Sizing';

export const GenNav = styled.nav`
	position: relative;
	padding: 5rem 0;
	z-index: 100;

	& ol {
		display: flex;
		align-items: center;
		justify-content: space-around;

		& li {
			margin: 0 0.5rem;
			display: inline-block;
			position: relative;

			& button {
				background: none;
				border: none;
				font-size: 1.7rem;
				font-weight: 700;
				color: ${({ theme }) => theme.secondary};

				@media ${device.sm} { 
					font-size: 1.5rem;
				}
			}

			& div {
				display: none;
				position: absolute;
				white-space: nowrap;
				background: #c4c4c4;

				& button {
					display: block;
					background: none;
					font-size: 1.5rem;
					border: none;
					margin: 1rem;
					text-align: left;
					color: #161616;
					cursor: pointer;
					&:hover {
						color: ${({ theme }) => theme.red};
					}

					@media ${device.sm} { 
						font-size: 1.3rem;
						white-space: break-spaces;
					}
				}
			}

			&:hover {
				& div {
					display: block;
				}
			}

			&:first-of-type {
				margin-left: 0;
			}

			&:last-of-type {
				margin-right: 0;
			}
		}
	}
`;

export const MethodNav = styled.nav`
	padding-bottom: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;

	& button {
		position: relative;
		background: none;
		border: 1px solid transparent;
		color: ${({ theme }) => theme.secondary};
		font-size: 1.7rem;
		font-weight: 700;
		transition: 0.3s ease-in-out;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			border-radius: 5px;
			transition: 0.3s ease-in-out;
		}

		&:hover::before {
			opacity: 0;
			transform: scale(0.5, 0.5);
		}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			opacity: 0;
			transition: 0.3s ease-in-out;
			background: ${({ theme }) => theme.secondary};
			border: 1px solid ${({ theme }) => theme.secondary};
			border-radius: 5px;
			transform: scale(1.2, 1.2);
		}

		&:hover::after {
			opacity: 1;
			transform: scale(1, 1);
		}

		& p {
			position: relative;
			padding: 1rem 1.5rem;
			z-index: 99;
			cursor: pointer;
			transition: 0.3s ease-in-out;
			&:hover {
				color: ${({ theme }) => theme.main};
			}
		}
	}

	.button_active {
		position: relative;
		font-size: 1.7rem;
		font-weight: 700;
		border: 1px solid transparent;
		border-radius: 5px;
		background: ${({ theme }) => theme.secondary};
		color: ${({ theme }) => theme.main};
		transition: 0.3s ease-in-out;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			border-radius: 5px;
			transition: 0.3s ease-in-out;
		}

		&:hover::before {
			opacity: 0;
			transform: scale(0.5, 0.5);
		}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			opacity: 0;
			transition: 0.3s ease-in-out;
			background: ${({ theme }) => theme.main};
			border: 1px solid ${({ theme }) => theme.secondary};
			border-radius: 5px;
			transform: scale(1.2, 1.2);
		}

		&:hover::after {
			opacity: 1;
			transform: scale(1, 1);
		}

		& p {
			position: relative;
			padding: 1rem 1.5rem;
			width: 100%;
			height: 100%;
			z-index: 99;
			color: ${({ theme }) => theme.main};
			cursor: pointer;
			transition: 0.3s ease-in-out;
			&:hover {
				color: ${({ theme }) => theme.secondary};
			}
		}
	}
`;
