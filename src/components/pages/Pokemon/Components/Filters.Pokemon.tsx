import Autocomplete from '@/components/autocomplete/Autocomplete';
import { Dropdown } from '@/components/common/styles/Inputs';
import { Divider } from '@/components/common/styles/Misc';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import {
  formOptions,
  generationsOptions,
  IOptions,
  IOptionsOffsetLimit,
  typeOptions,
} from '@/utils/DataArrays';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { SingleValue } from 'react-select';
import { PokedexDropdown, PokedexSearch } from '../Styled.Pokemon';

type Props = {
  pokedex: IPokemon[];
  setFilteredPokedex: Dispatch<SetStateAction<IPokemon[]>>;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  form: IOptionsOffsetLimit | null;
  setForm: Dispatch<SetStateAction<IOptionsOffsetLimit | null>>;
  generation: IOptionsOffsetLimit | null;
  setGeneration: Dispatch<SetStateAction<IOptionsOffsetLimit | null>>;
  type: IOptions[] | null;
  setType: Dispatch<SetStateAction<IOptions[]>>;
};

function Filters({
  pokedex,
  setFilteredPokedex,
  offset,
  setOffset,
  limit,
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
              setOffset(offset);
              setLimit(limit);
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

  const handleFormSelect = (option: SingleValue<IOptionsOffsetLimit>) => {
    setForm(option);
    setGeneration(null);
    setType([]);
  };

  const handleGenSelect = (option: SingleValue<IOptionsOffsetLimit>) => {
    setGeneration(option);
    setForm(null);
    setType([]);
  };

  const handleTypeSelect = (option: IOptions[]) => {
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
        <Autocomplete pokedex={pokedex} />
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
              handleFormSelect(option as IOptionsOffsetLimit);
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
              handleGenSelect(option as IOptionsOffsetLimit);
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
            // @ts-ignore
            components={
              type &&
              type?.length >= 2 && {
                Menu: () => null,
                MenuList: () => null,
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }
            }
            onChange={(option) => {
              handleTypeSelect(option as IOptions[]);
            }}
          />
        </PokedexDropdown>
      </PokedexSearch>
      <Divider />
    </>
  );
}

export default Filters;
