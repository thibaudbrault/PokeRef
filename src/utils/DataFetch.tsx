import { useQuery } from 'react-query';
import axios from 'axios';
import {
  Abilities,
  Evolution,
  Items,
  Locations,
  Machines,
  Moves,
  Pokemon,
  Species,
  Types,
} from '@/types/types';

// Fetch all pokemon
export function usePokedex(url: string) {
  return useQuery<Pokemon.Pokemon[], Error>([`pokedex`, url], () =>
    axios
      .get(url)
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(
          results?.map((res: { url: string }) => axios.get(res.url)),
        );
      })
      .then((results) => {
        return results?.map((res) => res.data);
      }),
  );
}

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
export function useMoves() {
  return useQuery<Moves.Moves[], Error>([`moves`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/move?limit=919`)
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(
          results?.map((res: { url: string }) => axios.get(res.url)),
        );
      })
      .then((results) => {
        return results?.map((res) => res.data);
      }),
  );
}

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
export function useTypes() {
  return useQuery<Types.Types[], Error>([`types`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/type?limit=18`)
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(
          results?.map((res: { url: string }) => axios.get(res.url)),
        );
      })
      .then((results) => {
        return results?.map((res) => res.data);
      }),
  );
}

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
export function useMachines() {
  return useQuery<Machines.Machines[], Error>([`machines`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/machine?limit=1700`)
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(
          results?.map((res: { url: string }) => axios.get(res.url)),
        );
      })
      .then((results) => {
        return results?.map((res) => res.data);
      }),
  );
}

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
export function usePokemon(url: string) {
  return useQuery<Pokemon.Pokemon, Error>([`pokemon`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

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
export function useMove(url: string) {
  return useQuery<Moves.Moves, Error>([`move`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

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
export function useAbility(url: string) {
  return useQuery<Abilities.Abilities, Error>([`ability`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

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
export function useSpecies(url: string) {
  return useQuery<Species.Species, Error>([`species`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

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
export function usePokemonLocation(url: string) {
  return useQuery<Pokemon.PokemonLocation, Error>(
    [`pokemonLocation`, url],
    () =>
      axios
        .get(url)
        .then((results) => {
          return results.data;
        })
        .then((results) => {
          return results;
        }),
  );
}

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
export function useEvolution(url: string) {
  return useQuery<Evolution.Evolution, Error>([`evolution`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

export const getEvolution = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};

// Fetch single type
export function useType(url: string) {
  return useQuery<Types.Types, Error>([`type`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

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
export function useItem(url: string) {
  return useQuery<Items.Items, Error>([`item`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

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
export function useLocation(url: string) {
  return useQuery<Locations.Locations, Error>([`location`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

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
export function useArea(url: string) {
  return useQuery<Locations.Area, Error>([`area`, url], () =>
    axios
      .get(url)
      .then((results) => {
        return results.data;
      })
      .then((results) => {
        return results;
      }),
  );
}

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
export function useFormat(url: string) {
  return useQuery([`format`, url], () =>
    axios.get(url).then((results) => {
      console.log(results.data);
      return results.data;
    }),
  );
}

export const getFormat = async (url: string) => {
  try {
    const res = await axios.get(url);
    const results = await res.data;
    return results;
  } catch (err) {
    console.error(err);
  }
};
