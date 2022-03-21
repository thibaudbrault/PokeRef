import styled from "styled-components";

export const Search = styled.div`
    display: flex;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 5rem;
    
	& div {
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
			padding: 0.5rem 1rem;
			background: transparent;
			border: 1px solid ${props => props.theme.colors.dark};
			border-radius: 5px;
			transition: 0.3s ease-in-out;
			&:focus {
				outline: none;
				border: 1px solid $red;
			}
			&::placeholder {
				color: $dark;
				opacity: 0.8;
			}
		}
	}
`