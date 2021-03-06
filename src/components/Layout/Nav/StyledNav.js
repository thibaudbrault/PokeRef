import styled from 'styled-components';
import { device } from '../../BaseStyles/Sizing';

export const MainNav = styled.nav`
	max-width: 1700px;
	margin: 0 auto;
`;

export const MainNavList = styled.ul`
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;

	& li {
		padding: 0 2rem;
		align-self: center;

		& a {
			padding-bottom: 0.2rem;
			position: relative;
			white-space: nowrap;
			font-size: 2rem;
			font-weight: 700;
			cursor: pointer;
			transition: 0.3s ease-in-out;
			&::before {
				position: absolute;
				width: 100%;
				height: 1px;
				background-color: ${({ theme }) => theme.secondary};
				top: 100%;
				left: 0;
				pointer-events: none;
				opacity: 0;
				transform-origin: 50% 0%;
				transform: translate3d(0, 3px, 0);
				transition-property: transform, opacity;
				transition-duration: 0.3s;
				transition-timing-function: cubic-bezier(0.2, 1, 0.8, 1);
			}
			&::after {
				position: absolute;
				width: 100%;
				height: 1px;
				background: ${({ theme }) => theme.secondary};
				top: 100%;
				left: 0;
				pointer-events: none;
				opacity: 0;
				transform-origin: 50% 0%;
				transform: translate3d(0, 3px, 0);
				transition-property: transform, opacity;
				transition-duration: 0.3s;
				transition-timing-function: cubic-bezier(0.2, 1, 0.8, 1);
			}
			&:hover::before {
				opacity: 1;
				transform: translate3d(0, 0, 0);
				transition-timing-function: cubic-bezier(0.2, 0, 0.3, 1);
			}
			&:hover::after {
				opacity: 1;
				transform: translate3d(0, 0, 0);
				transition-timing-function: cubic-bezier(0.2, 0, 0.3, 1);
			}
			&::before {
				content: '';
			}
			&::after {
				content: '';
				top: calc(100% + 4px);
				width: 70%;
				left: 15%;
			}
			&::before,
			&:hover::after {
				transition-delay: 0.1s;
			}
			&:hover::before {
				transition-delay: 0s;
			}
		}

		@media ${device.lg} {
			margin-bottom: 2rem;
		}
	}
	/* 
	@media ${device.sm} {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		align-items: center;
		justify-items: center;
	} */
`;
