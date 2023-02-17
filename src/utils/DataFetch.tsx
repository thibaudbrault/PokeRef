import { IEvolutionChain } from '@/types/Evolution/EvolutionChain';
import axios from 'axios';

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
    const baseRes = evolution.chain.species.url
    const basePromiseRes = await axios.get(baseRes)
    const middleRes = evolution.chain.evolves_to.map(ee => ee.species.url)
    const middlePromiseRes = await Promise.all(
      middleRes.map(res => axios.get(res))
    )
    const finalRes = evolution.chain.evolves_to.map(ee =>
      ee.evolves_to.map(eee => eee.species.url)
    )
    const finalPromiseRes = await Promise.all(
      finalRes.map(res => axios.get(res))
    )
    const results = [basePromiseRes.data, middlePromiseRes.map(res => res.data), finalPromiseRes.map(res => res.data)].flat()
    return results
  } catch (err) {
    console.error(err);
  }
}

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
