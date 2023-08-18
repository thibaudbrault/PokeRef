import {
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react';

import * as Label from '@radix-ui/react-label';
import Select, { type SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';

import {
  formOptions,
  generationsOptions,
  type IOptionsOffsetLimit,
} from '@/utils';

import styles from '../Pokedex.module.scss';
import { Search } from './Search';

import type { IPokemon } from '@/types';

type Props = {
  pokedex?: IPokemon[];
  setFilteredPokedex: Dispatch<SetStateAction<IPokemon[]>>;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  form: IOptionsOffsetLimit | null;
  setForm: Dispatch<SetStateAction<IOptionsOffsetLimit | null>>;
  generation: IOptionsOffsetLimit | null;
  setGeneration: Dispatch<SetStateAction<IOptionsOffsetLimit | null>>;
};

export function Filters({
  pokedex,
  setFilteredPokedex,
  offset,
  setOffset,
  page,
  setPage,
  setLimit,
  form,
  setForm,
  generation,
  setGeneration,
}: Props) {
  const getFilterPokemon = useCallback(() => {
    if (pokedex) {
      setFilteredPokedex(
        pokedex
          .map((pokedex) => pokedex)
          .flat()
          .filter((pokedex) => {
            if (!form && !generation) {
              setOffset((50 * page) % 1010);
              setLimit(offset === 1000 ? 10 : 50);
              return pokedex;
            } else if (form) {
              setOffset(form.offset);
              setLimit(form.limit);
              return pokedex.name.includes(form.value);
            } else if (generation) {
              setOffset(generation.offset);
              setLimit(generation.limit);
              return pokedex;
            }
          }),
      );
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, generation, page, pokedex, offset]);

  const handleFormSelect = (option: SingleValue<IOptionsOffsetLimit>) => {
    setForm(option);
    setPage(0);
    setGeneration(null);
  };

  const handleGenSelect = (option: SingleValue<IOptionsOffsetLimit>) => {
    setGeneration(option);
    setPage(0);
    setForm(null);
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    getFilterPokemon();
  }, [getFilterPokemon]);

  return (
    <section className={styles.search}>
      <Search />
      <div className={styles.dropdown}>
        <Label.Root htmlFor="form">Form</Label.Root>
        <Select
          key={form?.value}
          name="form"
          id="form"
          value={form}
          className="dropdown selectOptions"
          classNamePrefix="select"
          components={animatedComponents}
          isClearable
          options={formOptions}
          placeholder="Select"
          onChange={(option, { action }) => {
            handleFormSelect(option as IOptionsOffsetLimit);
            action === `clear` && setForm(null);
          }}
        />
      </div>

      <div className={styles.dropdown}>
        <Label.Root htmlFor="generation">Generation</Label.Root>
        <Select
          key={generation?.value}
          name="generation"
          id="generation"
          value={generation}
          className="dropdown selectOptions"
          classNamePrefix="select"
          components={animatedComponents}
          isClearable
          options={generationsOptions}
          placeholder="Select"
          onChange={(option, { action }) => {
            handleGenSelect(option as IOptionsOffsetLimit);
            action === `clear` && setGeneration(null);
          }}
        />
      </div>
    </section>
  );
}
