import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Dropdown } from '@/components/common/styles/Inputs';
import { Pokemon } from '@/types/types';
import { ProfileListLeft } from '../Styled.Profile';

type Props = {
  pokedex?: Pokemon.Pokemon[];
  pokemon: Pokemon.Pokemon | null;
  setPokemon: Dispatch<SetStateAction<Pokemon.Pokemon | null>>;
  pokemonAbility: Pokemon.Abilities | null;
  setPokemonAbility: Dispatch<SetStateAction<Pokemon.Abilities | null>>;
  pokemonMove: Pokemon.Moves | null;
  setPokemonMove: Dispatch<SetStateAction<Pokemon.Moves | null>>;
};

function ProfileCard({
  pokedex,
  pokemon,
  setPokemon,
  pokemonAbility,
  setPokemonAbility,
  pokemonMove,
  setPokemonMove,
}: Props) {
  const clearAllOptions = (option: Pokemon.Pokemon) => {
    console.log(option);
    setPokemon(option);
    setPokemonAbility(null);
    setPokemonMove(null);
  };

  return (
    <li>
      <ProfileListLeft>
        <Image
          src={pokemon?.sprites.front_default}
          alt="Empty"
          width={96}
          height={96}
        />
        <Dropdown<Pokemon.Pokemon>
          isClearable
          id="name"
          name="name"
          value={pokemon}
          className="selectOptions"
          classNamePrefix="select"
          options={pokedex}
          getOptionLabel={(option: Pokemon.Pokemon) => option.name}
          getOptionValue={(option: Pokemon.Pokemon) => option.name}
          placeholder="Name"
          onChange={(option) => {
            clearAllOptions(option);
          }}
        />
        <Dropdown<Pokemon.Abilities>
          isClearable
          id="item"
          name="item"
          value={pokemonAbility}
          className="selectOptions"
          classNamePrefix="select"
          options={pokemon?.abilities}
          getOptionLabel={(option: Pokemon.Abilities) =>
            option.ability.name.replace(/-/g, ` `)
          }
          getOptionValue={(option: Pokemon.Abilities) =>
            option.ability.name.replace(/-/g, ` `)
          }
          placeholder="Abilities"
          onChange={(option) => {
            setPokemonAbility(option);
          }}
        />
      </ProfileListLeft>
      <div>
        <Dropdown
          isClearable
          id="item"
          name="item"
          value={pokemonMove}
          className="selectOptions"
          classNamePrefix="select"
          options={pokemon?.moves}
          getOptionLabel={(option) => option.move.name.replace(/-/g, ` `)}
          getOptionValue={(option) => option.move.name.replace(/-/g, ` `)}
          placeholder="Moves"
          onChange={(option) => {
            setPokemonMove(option);
          }}
        />
      </div>
    </li>
  );
}

export default ProfileCard;
