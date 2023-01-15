import React, { Dispatch, SetStateAction } from 'react';
import { Dropdown } from '@/components/common/styles/Inputs';
import { Pokemon } from '@/types/types';

type Props = {
  pokemon: Pokemon.Pokemon | null;
  pokemonMove: Pokemon.Moves | null;
  setPokemonMove: Dispatch<SetStateAction<Pokemon.Moves | null>>;
};

function MovesProfileCard({ pokemon, pokemonMove, setPokemonMove }: Props) {
  return (
    <Dropdown<Pokemon.Moves>
      isClearable
      id="item"
      name="item"
      value={pokemonMove}
      className="selectOptions"
      classNamePrefix="select"
      options={pokemon?.moves}
      getOptionLabel={(option: Pokemon.Moves) =>
        option.move.name.replace(/-/g, ` `)
      }
      getOptionValue={(option: Pokemon.Moves) =>
        option.move.name.replace(/-/g, ` `)
      }
      placeholder="Moves"
      onChange={(option) => {
        setPokemonMove(option);
      }}
    />
  );
}

export default MovesProfileCard;
