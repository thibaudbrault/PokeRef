import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

export const Pagination = styled(ReactPaginate)`
  width: 90%;
  margin: 5rem auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & li {
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 600;
    cursor: pointer;

    & a {
      cursor: pointer;
    }
  }

  & .selected {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};
    border-radius: 50%;
  }

  & .disabled {
    opacity: 0.7;
  }
`;
