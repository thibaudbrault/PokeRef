import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Span } from '../../../../../CommonStyles/Headings';
import { Type } from '../../../../../CommonStyles/Themes';
import { PokemonDataCatch, PokemonDataCaught, PokemonDataDesc, PokemonDataTypes } from '../Styled.Data.PokemonCard';
import { Pokemon, Species } from '@/types/types';

type Props = {
  pokemon: Pokemon.Pokemon;
  species: Species.Species;
  game: string;
  caught: boolean;
  setCaught: Dispatch<SetStateAction<boolean>>;
};

function Desc({ pokemon, species, game, caught, setCaught }: Props) {


  const handleClick = () => {
    setCaught(true)
    let pokemons = JSON.parse(localStorage.getItem('pokemon') || '[]')
    let pokemonData = {
      pokemon: pokemon
    }
    pokemons.push(pokemon)
    localStorage.setItem('pokemon', JSON.stringify(pokemons))
  }

  return (
    <>
      <ul>
        {pokemon.id < 10000 &&
          <PokemonDataDesc>
            {species?.flavor_text_entries?.map(
              (sf) =>
                sf.language.name === `en` &&
                sf.version.name === game && (
                  <>{sf.flavor_text.replace(`\u000c`, ` `).replace(`é`, `É`)}</>
                ),
            )}
            <p>
              Pokémon{` `}
              <Span>
                <i>{game.replace(/-/g, ` `)}</i>
              </Span>
            </p>
          </PokemonDataDesc>
        }
        <PokemonDataTypes>
          {pokemon?.types?.map((pt) => (
            <Type id={pt.type.name} key={pt.type.name}>
              <Link
                href={{ pathname: `/type/[name]`, query: { name: pt.type.name } }}
              >
                <Image alt={pt.type.name} width={25} height={25} />
                <span>{pt.type.name}</span>
              </Link>
            </Type>
          ))}
        </PokemonDataTypes>
      </ul>
      {!caught ? (
        <PokemonDataCatch onClick={handleClick}>
          <Image src={`/pokeball.svg`} alt="" width={20} height={20} />
          Catch !
        </PokemonDataCatch>
      ) : (
        <PokemonDataCaught>
          <Image src={`/pokeball.svg`} alt="" width={20} height={20} />
          Caught !
        </PokemonDataCaught>
      )}
    </>
  );
}

export default Desc;
