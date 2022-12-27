import styled from 'styled-components';

export const DashTitle = styled.h2`
  padding-bottom: 5rem;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
`;

export const DashList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  & li {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};
    border-radius: 5px;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 3px;

    & span {
      font-size: 4rem;
      font-weight: 700;
      letter-spacing: normal;
    }
  }
`;

export const DashGraph = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
  padding: 2rem;
  background-color: #c4c4c4;
  border-radius: 5px;
`;
