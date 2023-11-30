import axios from 'axios';

import { BASE_URL, Limit, removeLongName } from '@/utils';

import type {
  IAbility,
  IApiResourceList,
  IEvolutionChain,
  IMove,
  IPokemon,
  IType,
} from '@/types';

// Fetch all pokemon names and endpoints
export const getPokedexResults = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/pokemon?limit=${Limit.POKEMON}`);
    const results = await res.data.results;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getMultiple = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getLocalMultiple = async (json: IApiResourceList) => {
  try {
    const results = json.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getSingle = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

// Fetch pokemon's types
export const getPokemonTypes = async (pokemon: IPokemon) => {
  try {
    const res = pokemon.types.map((t) => t.type.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (error) {
    console.error(error);
  }
};

// Fetch pokemon's forms
export const getPokemonForms = async (pokemon: IPokemon) => {
  try {
    const res = pokemon.forms.map((p) => p.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (error) {
    console.error(error);
  }
};

// Fetch move's pokemon array
export const getMovePokemon = async (move: IMove) => {
  try {
    const res = move.learned_by_pokemon.map((p) => p.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (error) {
    console.error(error);
  }
};

// Fetch move's machines array
export const getMoveMachines = async (move: IMove) => {
  try {
    const res = move.machines.map((m) => m.machine.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (error) {
    console.error(error);
  }
};

// Fetch move's target
export const getMoveTarget = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/move-target`);
    const results = await res.data.results;
    const promiseRes = await Promise.all(
      results.map((res: { url: string }) => axios.get(res.url)),
    );
    const result = promiseRes.map((res) => res.data);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Fetch ability's pokemon
export const getAbilityPokemon = async (ability: IAbility) => {
  try {
    const res = ability?.pokemon.map((a) => a.pokemon.url);
    const promiseRes = await Promise.all(res?.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
  }
};

// Fetch type's pokemon
export const getTypePokemon = async (type: IType) => {
  try {
    const res = type.pokemon.map((t) => t.pokemon.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (error) {
    console.error(error);
  }
};

// Fetch type's moves
export const getTypeMoves = async (type: IType) => {
  try {
    const res = type.moves.map((t) => t.url);
    const promiseRes = await Promise.all(res.map((res) => axios.get(res)));
    const results = promiseRes.map((res) => res.data);
    return results;
  } catch (error) {
    console.error(error);
  }
};

// Fetch a pokemon's cards
export const getCards = async (name: string) => {
  try {
    const res = await axios.get(
      `https://api.pokemontcg.io/v2/cards?q=name:${removeLongName(
        name,
      )}&orderBy=set.releaseDate`,
      {
        headers: {
          'X-Api-Key': process.env.NEXT_POKEMONTCG_API_KEY as string,
        },
      },
    );
    const results = await res.data.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

// export const getTrainers = async (
//   owner: string,
//   repo: string,
//   folder: string,
// ) => {
//   try {
//     const res = await axios.get(
//       `https://api.github.com/repos/${owner}/${repo}/contents/${folder}/trainers?ref=main`,
//     );
//     const results = await res.data;
//     return results;
//   } catch (error) {
//     console.error(error);
//   }
// };
