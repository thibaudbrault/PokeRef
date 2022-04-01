import styled from 'styled-components';

export const PokedexDropdown = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & label {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        justify-self: flex-start;
    }

    & select {
        width: 10vw;
        padding: 0.5rem;
        color: ${({ theme }) => theme.secondary};
        background: transparent;
        border: 1px solid ${({ theme }) => theme.secondary};
        border-radius: 5px;
        transition: 0.3s ease-in-out;
        &:focus {
            border: 1px solid ${({ theme }) => theme.red};
        }
    }
`