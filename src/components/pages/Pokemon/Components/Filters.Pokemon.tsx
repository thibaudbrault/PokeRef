import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { Pokemon } from '@/types/types';
import Autocomplete from '@/components/autocomplete/Autocomplete';
import { PokedexDropdown, PokedexSearch } from '../Styled.Pokemon';
import {
  Options,
  generationsOptions,
  typeOptions,
  OptionsOffsetLimit,
  formOptions,
} from '@/utils/DataArrays';
import { Dropdown } from '@/components/common/styles/Inputs';

type Props = {
  pokedex?: Pokemon.Pokemon[];
  setFilteredPokedex: Dispatch<SetStateAction<Pokemon.Pokemon[]>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  form: OptionsOffsetLimit | null;
  setForm: Dispatch<SetStateAction<OptionsOffsetLimit | null>>;
  generation: OptionsOffsetLimit | null;
  setGeneration: Dispatch<SetStateAction<OptionsOffsetLimit | null>>;
  type: Options[] | null;
  setType: Dispatch<SetStateAction<Options[]>>;
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
            if (!type?.length) {
              return pokedex;
            } else if (type.length === 1) {
              return pokedex.types
                .map((pt) => pt.type.name)
                .includes(type[0].value);
            } else if (type.length === 2 && pokedex.types.length === 2) {
              return pokedex.types.every((pt) =>
                type.find((t) => t.value.includes(pt.type.name)),
              );
            }
          })
          .filter((pokedex) => {
            if (!form && !generation) {
              setOffset(0);
              setLimit(1008);
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
  };

  const handleFormSelect = (option: SingleValue<OptionsOffsetLimit>) => {
    setForm(option);
    setGeneration(null);
    setType([]);
  };

  const handleGenSelect = (option: SingleValue<OptionsOffsetLimit>) => {
    setGeneration(option);
    setForm(null);
    setType([]);
  };

  const handleTypeSelect = (option: MultiValue<Options>) => {
    if (option) {
      setType(option);
    }
  };

  useEffect(() => {
    getFilterPokemon();

    //NOTE: EsLint wants to add the function above in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokedex, form, generation, type]);

  return (
    <>
      <PokedexSearch>
        <Autocomplete />
        <PokedexDropdown>
          <label htmlFor="form">Form</label>
          <Dropdown
            name="form"
            id="form"
            value={form}
            className="selectOptions"
            classNamePrefix="select"
            options={formOptions}
            placeholder="Select"
            onChange={(option) => {
              handleFormSelect(option);
            }}
          />
        </PokedexDropdown>

        <PokedexDropdown>
          <label htmlFor="generation">Generation</label>
          <Dropdown
            name="generation"
            id="generation"
            value={generation}
            className="selectOptions"
            classNamePrefix="select"
            options={generationsOptions}
            placeholder="Select"
            onChange={(option) => {
              handleGenSelect(option);
            }}
          />
        </PokedexDropdown>

        <PokedexDropdown>
          <label htmlFor="type">Type</label>
          <Dropdown
            isMulti
            isClearable
            isSearchable={false}
            name="type"
            id="type"
            className="selectOptions"
            classNamePrefix="select"
            options={typeOptions}
            placeholder="Select"
            isOptionDisabled={() => type?.length >= 2}
            onChange={(option) => {
              handleTypeSelect(option);
            }}
          />
        </PokedexDropdown>
      </PokedexSearch>
      <hr />
    </>
  );
}

export default Filters;
