import Link from 'next/link';
import styled from 'styled-components';

export const FullWidthTable = styled(Table)`
  width: 100%;
`;

export const TCapitalize = styled.td`
  text-transform: capitalize;
`;

export const TBold = styled.td`
  text-transform: capitalize;
  font-size: 1.7rem;
  font-weight: 600;
`;

export const TLink = styled(Link)`
  text-transform: capitalize;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
  }

  &.bold {
    font-weight: 600;
  }
`;

export const TCategory = styled.td`
  & div {
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
      text-transform: capitalize;
      padding-left: 0.5rem;
    }
  }
`;

export const TType = styled.td`
  & div {
    width: fit-content;
    margin: 0 auto;
    padding: 0.5rem 1.5rem;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;

      & img {
        cursor: pointer;
      }
      & span {
        font-family: 'Oswald', sans-serif;
        font-size: 1.7rem;
        color: ${({ theme }) => theme.secondary};
        text-shadow: ${({ theme }) => theme.main} -1px -1px 0px,
          ${({ theme }) => theme.main} 1px -1px 0px,
          ${({ theme }) => theme.main} -1px 1px 0px,
          ${({ theme }) => theme.main} 1px 1px 0px;
        cursor: pointer;
      }
    }
  }
`;

export const TEffect = styled.td`
  text-align: start;

  & span {
    display: block;
  }
`;
