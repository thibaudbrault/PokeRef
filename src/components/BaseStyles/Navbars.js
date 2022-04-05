import styled from 'styled-components';

export const GenNav = styled.nav`
    position: relative;
	padding: 5rem 0;
	z-index: 100;

    & ol {
        display: flex;
		align-items: center;
		justify-content: space-around;

        & li {
            display: inline-block;
			position: relative;

            & button {
                background: none;
				border: none;
				font-size: 1.7rem;
				font-weight: 700;
                color: ${({ theme }) => theme.secondary};
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
                    color: #161616;
					cursor: pointer;
					&:hover {
						color: ${({ theme }) => theme.red};
					}
                }
            }

            &:hover {

                & div {
                    display: block;
                }
            }
        }
    }
`