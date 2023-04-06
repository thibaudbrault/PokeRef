import { IEvolutionChain } from '@/types/Evolution/EvolutionChain';
import { IMove } from '@/types/Moves/Move';
import { IAbility } from '@/types/Pokemon/Ability';
import { IType } from '@/types/Pokemon/Type';
import axios from 'axios';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { removeLongName } from './Typography';

// Fetch all pokemon names and endpoints
export const getPokedexResults = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1010`);
    const results = await res.data.results;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all pokemon
export const getPokedex = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all moves
export const getMoves = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/move?limit=919`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all status
export const getStatus = async () => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/move-ailment?limit=22`,
    );
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all stats
export const getStats = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/stat`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all abilities
export const getAbilities = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/ability?limit=359`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all types
export const getTypes = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/type?limit=18`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all machines
export const getMachines = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/machine?limit=1700`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all items
export const getItems = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/item?limit=2051`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all berries
export const getBerries = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/berry?limit=66`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all locations
export const getRegions = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/region?limit=10`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all encounter condition
export const getEncounterCondition = async () => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/encounter-condition-value?limit=67`,
    );
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all encounter methods
export const getEncounterMethod = async () => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/encounter-method?limit=31`,
    );
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch single pokemon
export const getPokemon = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch pokemon's types
export const getPokemonTypes = async (pokemon: IPokemon) => {
  try {
    const res = pokemon.types.map((t) => t.type.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch pokemon's forms
export const getPokemonForms = async (pokemon: IPokemon) => {
  try {
    const res = pokemon.forms.map((p) => p.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch single move
export const getMove = async (name: string) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/move/${name}`);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch move's pokemon array
export const getMovePokemon = async (move: IMove) => {
  try {
    const res = move.learned_by_pokemon.map((p) => p.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch move's machines array
export const getMoveMachines = async (move: IMove) => {
  try {
    const res = move.machines.map((m) => m.machine.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch move's target
export const getMoveTarget = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/move-target`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Fetch single ability
export const getAbility = async (name: string) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/ability/${name}`);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch ability's pokemon
export const getAbilityPokemon = async (ability: IAbility) => {
  try {
    const res = ability?.pokemon.map((a) => a.pokemon.url);
    const promiseRes = await Promise.all(res?.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch single pokemon species
export const getSpecies = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch location for a single pokemon
export const getPokemonLocation = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch evolution chain of a single pokemon
export const getEvolution = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch all stages of a pokemon evolution chain
export const getAllEvo = async (evolution: IEvolutionChain) => {
  try {
    const baseRes = evolution.chain.species.url;
    const basePromiseRes = await axios.get(baseRes);
    if (evolution.chain.evolves_to.length > 0) {
      const middleRes = evolution.chain.evolves_to.map((ee) => ee.species.url);
      const middlePromiseRes = await Promise.all(
        middleRes.map((res) => axios.get(res)),
      );
      const finalRes = evolution.chain.evolves_to.map((ee) =>
        ee.evolves_to.map((eee) => eee.species.url),
      );
      const finalPromiseRes = await Promise.all(
        finalRes[0].map((res) => axios.get(res)),
      );
      const results = [
        basePromiseRes.data,
        middlePromiseRes.map((res) => res.data),
        finalPromiseRes.map((res) => res.data),
      ].flat();
      return results;
    } else {
      const results = [basePromiseRes.data];
      return results;
    }
  } catch (err) {
    console.error(err);
  }
};

// Fetch single type
export const getType = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch type's pokemon
export const getTypePokemon = async (type: IType) => {
  try {
    const res = type.pokemon.map((t) => t.pokemon.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch type's moves
export const getTypeMoves = async (type: IType) => {
  try {
    const res = type.moves.map((t) => t.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch single item
export const getItem = async (name: string) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/item/${name}`);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch single location
export const getLocation = async (name: string) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/location/${name}`);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch single area
export const getArea = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

//Fetch format
export const getFormat = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch a pokemon's cards
export const getCards = async (name: string) => {
  try {
    const res = await axios.get(
      `https://api.pokemontcg.io/v2/cards?q=name:${removeLongName(name)}`,
      {
        headers: {
          'X-Api-Key': process.env.NEXT_POKEMONTCG_API_KEY as string,
        },
      },
    );
    const results = await res.data.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

export const getTrainers = async (
  owner: string,
  repo: string,
  folder: string,
) => {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${folder}/trainers?ref=main`,
    );
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};
