import styled from 'styled-components';

export const PokemonContents = styled.section`
  position: sticky;
  padding: 1rem 1.5rem;
  margin-bottom: 5rem;
  top: 0;
  font-size: 2rem;
  background: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.secondary};
  z-index: 3;

  & div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & p {
        font-size: 2rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    & button {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        border-radius: 50%;
        font-size: 2.5rem;
        font-weight: 600;
        color: ${({ theme }) => theme.secondary};
        transition: 0.3s ease-in-out;

        &:hover {
            background: rgba(130, 130, 130, 0.2);
        }
    }
  }
`;