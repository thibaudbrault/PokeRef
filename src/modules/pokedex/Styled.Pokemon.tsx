import styled from 'styled-components';

export const PokedexTypes = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  & div {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;
    color: ${({ theme }) => theme.secondary};
    font-size: 1.7rem;
    text-shadow: ${({ theme }) => theme.main} -1px -1px 0px,
      ${({ theme }) => theme.main} 1px -1px 0px,
      ${({ theme }) => theme.main} -1px 1px 0px,
      ${({ theme }) => theme.main} 1px 1px 0px;
    border: 1px solid rgba(22, 22, 22, 0.2);

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      cursor: pointer;

      & img {
        cursor: pointer;
      }

      & span {
        font-family: 'Oswald', sans-serif;
        cursor: pointer;
      }
    }
  }
`;
