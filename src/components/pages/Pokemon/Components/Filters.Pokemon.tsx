import { Pokemon } from '@/types/types';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Autocomplete from '@/components/autocomplete/Autocomplete';
import { PokedexDropdown, PokedexSearch } from '../Styled.Pokemon';
import { formFilters, genFilters, typeFilters } from '@/utils/DataArrays';
import GenerationsMethod from '@/utils/GenerationsMethod';

type Props = {
  pokedex: Pokemon.Pokemon[];
  setOffset: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  form: string;
  setForm: Dispatch<SetStateAction<string>>;
  generation: string;
  setGeneration: Dispatch<SetStateAction<string>>;
};

function Filters({
  pokedex,
  setOffset,
  setLimit,
  type,
  setType,
  form,
  setForm,
  generation,
  setGeneration,
}: Props) {
  const genFiltersFn = (generation: string, pokedex: Pokemon.Pokemon) => {
    genFilters.forEach((g) => {
      g.generation === generation && (setOffset(g.offset), setLimit(g.limit));
      return pokedex;
    });
  };

  const formFiltersFn = (form: string, pokedex: Pokemon.Pokemon) => {
    formFilters.forEach((f) => {
      f.form === form && (setOffset(f.offset), setLimit(f.limit));
      return pokedex.name.includes(f.form);
    });
  };

  useEffect(() => {
    pokedex
      .filter((pokedex) => {
        if (type === 'all') {
          return pokedex;
        } else {
          return pokedex.types.filter((pt) => pt.type.name === type);
        }
      })
      .filter((pokedex) => {
        if (form === `default` && generation === `all`) {
          setOffset(0);
          setLimit(905);
          return pokedex;
        } else if (form !== `default`) {
          return formFiltersFn(form, pokedex);
        } else if (generation !== `all`) {
          return genFiltersFn(generation, pokedex);
        }
      });
  }, [pokedex, form, generation, type]);

  console.log(pokedex.map((p) => p.name.includes(form)));

  return (
    <>
      <PokedexSearch>
        <Autocomplete />
        <PokedexDropdown>
          <label htmlFor="form">Form</label>
          <select
            name="form"
            id="form"
            value={form}
            onChange={(e) => {
              setForm(e.target.value);
              setGeneration(`all`);
              setType(`all`);
            }}
          >
            <option value="default">Default</option>
            <option value="regional - alola">Regional - Alola</option>
            <option value="regional - galar">Regional - Galar</option>
            <option value="regional - hisui">Regional - Hisui</option>
            <option value="mega">Mega</option>
            <option value="gmax">Gmax</option>
          </select>
        </PokedexDropdown>

        <PokedexDropdown className={form === `default` ? `` : `hidden`}>
          <label htmlFor="generation">Generation</label>
          <select
            name="generation"
            id="generation"
            value={generation}
            onChange={(e) => {
              setGeneration(e.target.value);
              setForm(`default`);
              setType(`all`);
            }}
          >
            <option value="all">All</option>
            <GenerationsMethod />
          </select>
        </PokedexDropdown>

        <PokedexDropdown>
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="all">All</option>
            {typeFilters.map(type => (
              <option value={type.type}>
                {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
              </option>
            ))}
          </select>
        </PokedexDropdown>
      </PokedexSearch>
      <hr />
    </>
  );
}

export default Filters;
