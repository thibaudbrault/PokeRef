import { Pokemon } from '@/types/types';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Autocomplete from '@/components/autocomplete/Autocomplete';
import { PokedexDropdown, PokedexSearch } from '../Styled.Pokemon';
import { formFilters, genFilters } from '@/utils/DataArrays';
import { GenerationsMethod, TypesMethod } from '@/utils/ObjectsMap';

type Props = {
  pokedex?: Pokemon.Pokemon[];
  setFilteredPokedex: Dispatch<SetStateAction<Pokemon.Pokemon[]>>;
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
  setFilteredPokedex,
  setOffset,
  setLimit,
  type,
  setType,
  form,
  setForm,
  generation,
  setGeneration,
}: Props) {
  const getFilterPokemon = () => {
    if (pokedex) {
      setFilteredPokedex(
        pokedex
          .filter((pokedex) => {
            if (type === `all`) {
              return pokedex;
            }
            return pokedex.types.map((pt) => pt.type.name).includes(type);
          })
          .filter((pokedex) => {
            if (form === `default` && generation === `all`) {
              setOffset(0);
              setLimit(905);
              return pokedex;
            } else if (form !== `default`) {
              setOffset(formFilters[form].offset);
              setLimit(formFilters[form].limit);
              return pokedex.name.includes(form);
            } else if (generation !== `all`) {
              setOffset(genFilters?.[generation].offset);
              setLimit(genFilters?.[generation].limit);
              return pokedex;
            }
          }),
      );
    }
  };

  useEffect(() => {
    getFilterPokemon();
  }, [pokedex, form, generation, type]);

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
            <option value="alola">Regional - Alola</option>
            <option value="galar">Regional - Galar</option>
            <option value="hisui">Regional - Hisui</option>
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
            <TypesMethod />
          </select>
        </PokedexDropdown>
      </PokedexSearch>
      <hr />
    </>
  );
}

export default Filters;
