import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Select from 'react-select';
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
              return (
                pokedex.types[0].type.name.includes(
                  type[0].value || type?.[1].value,
                ) ||
                pokedex?.types?.[1].type.name.includes(
                  type[0].value || type?.[1].value,
                )
              );
            }
          })
          .filter((pokedex) => {
            if (!form && !generation) {
              setOffset(0);
              setLimit(905);
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

  console.log(type?.[0] && type?.[0].value);
  console.log(type?.[1] && type?.[1].value);

  const handleFormSelect = (option: OptionsOffsetLimit) => {
    setForm(option);
    setGeneration(null);
    setType([]);
  };

  const handleGenSelect = (option: OptionsOffsetLimit) => {
    setGeneration(option);
    setForm(null);
    setType([]);
  };

  const handleTypeSelect = (option: Options[]) => {
    setType(option);
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
          <Select
            name="form"
            id="form"
            value={form}
            className="selectOptions"
            classNamePrefix="select"
            options={formOptions}
            getOptionValue={(option) => option.value}
            placeholder="Default"
            onChange={(option) => {
              handleFormSelect(option);
            }}
          />
        </PokedexDropdown>

        <PokedexDropdown>
          <label htmlFor="generation">Generation</label>
          <Select
            name="generation"
            id="generation"
            value={generation}
            className="selectOptions"
            classNamePrefix="select"
            options={generationsOptions}
            getOptionValue={(option) => option.value}
            placeholder="All"
            onChange={(option) => {
              handleGenSelect(option);
            }}
          />
        </PokedexDropdown>

        <PokedexDropdown>
          <label htmlFor="type">Type</label>
          <Select
            isMulti
            isClearable
            isSearchable={false}
            name="type"
            id="type"
            className="selectOptions"
            classNamePrefix="select"
            options={typeOptions}
            getOptionValue={(option) => option.value}
            placeholder="All"
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
