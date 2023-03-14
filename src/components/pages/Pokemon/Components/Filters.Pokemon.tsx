import Autocomplete from '@/components/autocomplete/Autocomplete';
import { Dropdown } from '@/components/common/styles/Inputs';
import { Divider } from '@/components/common/styles/Misc';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import {
  formOptions,
  generationsOptions,
  IOptionsOffsetLimit,
} from '@/utils/DataArrays';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { SingleValue } from 'react-select';
import { PokedexDropdown, PokedexSearch } from '../Styled.Pokemon';

type Props = {
  pokedex: IPokemon[];
  setFilteredPokedex: Dispatch<SetStateAction<IPokemon[]>>;
  setOffset: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  form: IOptionsOffsetLimit | null;
  setForm: Dispatch<SetStateAction<IOptionsOffsetLimit | null>>;
  generation: IOptionsOffsetLimit | null;
  setGeneration: Dispatch<SetStateAction<IOptionsOffsetLimit | null>>;
};

function Filters({
  pokedex,
  setFilteredPokedex,
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
              setOffset(50 * page);
              setLimit(50);
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
  }, [form, generation, page, pokedex]);

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

  useEffect(() => {
    getFilterPokemon();
  }, [getFilterPokemon]);

  return (
    <>
      <PokedexSearch>
        <Autocomplete />
        <PokedexDropdown>
          <label htmlFor="form">Form</label>
          <Dropdown
            key={form?.value}
            name="form"
            id="form"
            value={form}
            className="selectOptions"
            classNamePrefix="select"
            isClearable
            options={formOptions}
            placeholder="Select"
            onChange={(option, { action }) => {
              handleFormSelect(option as IOptionsOffsetLimit);
              action === `clear` && setForm(null);
            }}
          />
        </PokedexDropdown>

        <PokedexDropdown>
          <label htmlFor="generation">Generation</label>
          <Dropdown
            key={generation?.value}
            name="generation"
            id="generation"
            value={generation}
            className="selectOptions"
            classNamePrefix="select"
            isClearable
            options={generationsOptions}
            placeholder="Select"
            onChange={(option, { action }) => {
              handleGenSelect(option as IOptionsOffsetLimit);
              action === `clear` && setGeneration(null);
            }}
          />
        </PokedexDropdown>
      </PokedexSearch>
      <Divider />
    </>
  );
}

export default Filters;
