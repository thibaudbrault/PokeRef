import React, { useState } from 'react';
import Image from 'next/image';
import { Dropdown } from '@/components/common/styles/Inputs';
import { Pokemon } from '@/types/types';
import { ProfileListLeft, ProfileListRight } from '../Styled.Profile';
import MovesProfileCard from './Moves.ProfileCard';

type Props = {
  pokedex?: Pokemon.Pokemon[];
};

function ProfileCard({ pokedex }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon.Pokemon | null>(null);
  const [pokemonAbility, setPokemonAbility] =
    useState<Pokemon.Abilities | null>(null);
  const [pokemonMove, setPokemonMove] = useState<Pokemon.Moves | null>(null);

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
      <ProfileListRight>
        {Array(4)
          .fill(true)
          .map((_, i) => (
            <MovesProfileCard
              key={i}
              pokemon={pokemon}
              pokemonMove={pokemonMove}
              setPokemonMove={setPokemonMove}
            />
          ))}
      </ProfileListRight>
    </li>
  );
}

export default ProfileCard;
