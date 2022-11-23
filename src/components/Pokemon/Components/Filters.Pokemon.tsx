import { Pokemon } from '@/types/types';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Autocomplete from '../../Autocomplete/Autocomplete';
import { PokedexDropdown, PokedexSearch } from '../StyledPokemon';

type Props = {
  pokedex: Pokemon[];
  setFilteredPokedex: Dispatch<SetStateAction<any[]>>;
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
  // Return all pokemon when the type is 'all'
  // Modify the returned pokemon according to the options selected in the filters
  // Modify the offset then filter with a word in the pokemon's name or with the pokemon's id

  useEffect(() => {
    setFilteredPokedex(
      pokedex
        .filter((pokedex) => {
          return (
            type === `all` ||
            pokedex.types.map((pt) => pt.type.name).includes(type)
          );
        })
        .filter((pokedex) => {
          if (form === `default` && generation === `all`) {
            setOffset(0);
            setLimit(905);
            return pokedex;
          } else if (form === `regional - alola`) {
            setOffset(995);
            setLimit(30);
            return pokedex?.name?.includes(`alola`);
          } else if (form === `regional - galar`) {
            setOffset(1065);
            setLimit(25);
            return pokedex?.name?.includes(`galar`);
          } else if (form === `regional - hisui`) {
            setOffset(1133);
            setLimit(20);
            return (
              pokedex?.name?.includes(`hisui`) ||
              pokedex?.name?.includes(`origin`)
            );
          } else if (form === `mega`) {
            setOffset(937);
            setLimit(70);
            return (
              pokedex?.name?.includes(`-mega`) ||
              pokedex?.name?.includes(`primal`)
            );
          } else if (form === `gmax`) {
            setOffset(1099);
            setLimit(35);
            return pokedex?.name?.includes(`gmax`);
          } else if (generation === `gen1`) {
            setOffset(0);
            setLimit(151);
            return pokedex;
          } else if (generation === `gen2`) {
            setOffset(151);
            setLimit(100);
            return pokedex;
          } else if (generation === `gen3`) {
            setOffset(251);
            setLimit(135);
            return pokedex;
          } else if (generation === `gen4`) {
            setOffset(386);
            setLimit(107);
            return pokedex;
          } else if (generation === `gen5`) {
            setOffset(493);
            setLimit(156);
            return pokedex;
          } else if (generation === `gen6`) {
            setOffset(649);
            setLimit(72);
            return pokedex;
          } else if (generation === `gen7`) {
            setOffset(721);
            setLimit(88);
            return pokedex;
          } else if (generation === `gen8`) {
            setOffset(809);
            setLimit(96);
            return pokedex;
          }
        }),
    );
  }, [
    pokedex,
    form,
    type,
    generation,
    setFilteredPokedex,
    setOffset,
    setLimit,
  ]);

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
            <option value="gen1">Generation I</option>
            <option value="gen2">Generation II</option>
            <option value="gen3">Generation III</option>
            <option value="gen4">Generation IV</option>
            <option value="gen5">Generation V</option>
            <option value="gen6">Generation VI</option>
            <option value="gen7">Generation VII</option>
            <option value="gen8">Generation VIII</option>
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
            <option value="bug">Bug</option>
            <option value="dark">Dark</option>
            <option value="dragon">Dragon</option>
            <option value="electric">Electric</option>
            <option value="fairy">Fairy</option>
            <option value="fighting">Fighting</option>
            <option value="fire">Fire</option>
            <option value="flying">Flying</option>
            <option value="ghost">Ghost</option>
            <option value="grass">Grass</option>
            <option value="ground">Ground</option>
            <option value="ice">Ice</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="steel">Steel</option>
            <option value="water">Water</option>
          </select>
        </PokedexDropdown>
      </PokedexSearch>
      <hr />
    </>
  );
}

export default Filters;
