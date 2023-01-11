import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Dropdown } from '@/components/common/styles/Inputs';
import { Pokemon } from '@/types/types';

type Props = {
  pokedex?: Pokemon.Pokemon[];
  pokemon: Pokemon.Pokemon | null;
  setPokemon: Dispatch<SetStateAction<Pokemon.Pokemon | null>>;
  pokemonAbility: Pokemon.Abilities | null;
  setPokemonAbility: Dispatch<SetStateAction<Pokemon.Abilities | null>>;
};

function ProfileCard({
  pokedex,
  pokemon,
  setPokemon,
  pokemonAbility,
  setPokemonAbility,
}: Props) {
  return (
    <li>
      <div>
        <Image
          src={pokemon?.sprites.front_default}
          alt="Empty"
          width={96}
          height={96}
        />
        <Dropdown
          isClearable
          id="name"
          name="name"
          value={pokemon}
          className="selectOptions"
          classNamePrefix="select"
          options={pokedex}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          placeholder="Name"
          onChange={(option) => {
            setPokemon(option);
          }}
        />
      </div>
      <Dropdown
        isClearable
        id="item"
        name="item"
        value={pokemonAbility}
        className="selectOptions"
        classNamePrefix="select"
        options={pokemon?.abilities}
        getOptionLabel={(option) => option.ability.name.replace(/-/g, ` `)}
        getOptionValue={(option) => option.ability.name.replace(/-/g, ` `)}
        placeholder="Abilities"
        onChange={(option) => {
          setPokemonAbility(option);
        }}
      />
    </li>
  );
}

export default ProfileCard;
