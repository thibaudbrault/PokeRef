import Select from 'react-select';
import styled from 'styled-components';
import { device } from './Sizing';

export const Search = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 5rem;
`;

export const Input = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;

  & label {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  & input {
    width: 15vw;
    min-width: 15rem;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.secondary};
    background: transparent;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 5px;
    transition: 0.3s ease-in-out;

    &:focus {
      outline: none;
      border: 1px solid ${({ theme }) => theme.red};
    }
    &::placeholder {
      color: ${({ theme }) => theme.secondary};
      opacity: 0.8;
    }
  }
`;

export const Dropdown = styled(Select)`
  & .select__control {
    min-width: 15rem;
    padding: 0 0.5rem;
    color: ${({ theme }) => theme.secondary};
    background: transparent;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 5px;
    text-transform: capitalize;
    font-size: 1.3rem;
    transition: 0.3s ease-in-out;

    &--is-focused {
      outline: none;
      border: 1px solid ${({ theme }) => theme.red};
      box-shadow: none;

      &:hover {
        border-color: ${({ theme }) => theme.red};
      }
    }

    & .select__input-container {
      color: ${({ theme }) => theme.secondary} !important;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    & .select__placeholder {
      color: ${({ theme }) => theme.secondary};
    }

    & .select__indicator-separator {
      background-color: ${({ theme }) => theme.secondary};
    }

    & .select__dropdown-indicator {
      color: ${({ theme }) => theme.secondary};
    }
  }

  & .select__menu {
    color: ${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.main};
    text-transform: capitalize;
    font-size: 1.3rem;

    & .select__option {
      cursor: pointer;
      background-color: transparent;
      &--is-focused {
        background-color: transparent;
        color: ${({ theme }) => theme.red};
      }
    }
  }

  & .select__multi-value {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};

    &__remove {
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        background-color: transparent;
        color: ${({ theme }) => theme.red};
      }
    }

    & .select__input {
      color: white !important;
    }
  }

  & .select__single-value {
    padding: 3px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};
  }

  & .select__clear-indicator {
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.red};
    }
  }

  @media ${device.md} {
    width: 100%;
  }
`;
