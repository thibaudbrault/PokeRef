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
  IOptions,
  Limit,
  formOptions,
  generationOptions,
  typeOptions,
  type IOptionsOffsetLimit,
} from '@/utils';

import styles from '../Pokedex.module.scss';
import { Search } from './Search';

import type { IPokemon } from '@/types';

type Props = {
  pokedex?: IPokemon[];
  pokedexWithType?: IPokemon[];
  setFilteredPokedex: Dispatch<SetStateAction<IPokemon[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  form: IOptionsOffsetLimit | null;
  setForm: Dispatch<SetStateAction<IOptionsOffsetLimit | null>>;
  generation: IOptionsOffsetLimit | null;
  setGeneration: Dispatch<SetStateAction<IOptionsOffsetLimit | null>>;
  type: IOptions | null;
  setType: Dispatch<SetStateAction<IOptions | null>>;
};

export function Filters({
  pokedex,
  pokedexWithType,
  setFilteredPokedex,
  page,
  setPage,
  offset,
  setOffset,
  setLimit,
  form,
  setForm,
  generation,
  setGeneration,
  type,
  setType,
}: Props) {
  const resultsLastPage = Limit.POKEMON % 50;
  const limitLastPage = Limit.POKEMON - resultsLastPage;

  const getFilterPokemon = useCallback(() => {
    if (pokedex && !pokedexWithType) {
      setFilteredPokedex(
        pokedex
          .map((pokedex) => pokedex)
          .flat()
          .filter((pokedex) => {
            if (!form && !generation && !type) {
              setOffset((50 * page) % Limit.POKEMON);
              setLimit(offset === limitLastPage ? resultsLastPage : 50);
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
    if (pokedexWithType) {
      setFilteredPokedex(pokedexWithType.map((pokedex) => pokedex));
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, generation, type, page, offset, pokedex, pokedexWithType]);

  const handleFormSelect = (option: SingleValue<IOptionsOffsetLimit>) => {
    setForm(option);
    setPage(0);
    setGeneration(null);
    setType(null);
  };

  const handleGenSelect = (option: SingleValue<IOptionsOffsetLimit>) => {
    setGeneration(option);
    setPage(0);
    setForm(null);
    setType(null);
  };

  const handleTypeSelect = (option: SingleValue<IOptions>) => {
    setGeneration(null);
    setPage(0);
    setForm(null);
    setType(option);
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    getFilterPokemon();
  }, [getFilterPokemon]);

  return (
    <section className={styles.filters}>
      <Search onGrid={true} />
      <div className={styles.form}>
        <Label.Root htmlFor="form">Form</Label.Root>
        <Select
          key={form?.value}
          name="form"
          id="form"
          value={form}
          className="dropdown"
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

      <div className={styles.generation}>
        <Label.Root htmlFor="generation">Generation</Label.Root>
        <Select
          key={generation?.value}
          name="generation"
          id="generation"
          value={generation}
          className="dropdown"
          classNamePrefix="select"
          components={animatedComponents}
          isClearable
          options={generationOptions}
          placeholder="Select"
          onChange={(option, { action }) => {
            handleGenSelect(option as IOptionsOffsetLimit);
            action === `clear` && setGeneration(null);
          }}
        />
      </div>

      <div className={styles.type}>
        <Label.Root htmlFor="type">Type</Label.Root>
        <Select
          key={type?.value}
          name="type"
          id="type"
          value={type}
          className="dropdown"
          classNamePrefix="select"
          components={animatedComponents}
          isClearable
          options={typeOptions}
          placeholder="Select"
          onChange={(option, { action }) => {
            handleTypeSelect(option as IOptions);
            action === `clear` && setType(null);
          }}
        />
      </div>
    </section>
  );
}
