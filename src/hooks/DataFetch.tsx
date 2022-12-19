import axios from 'axios';
import { useQuery } from 'react-query';

// Fetch all pokemon
export function usePokedex(url: string) {
  return useQuery([`pokedex`, url], () =>
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

// Fetch all moves
export function useMoves() {
  return useQuery([`moves`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/move?limit=826`)
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

// Fetch all status
export function useStatus() {
  return useQuery([`status`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/move-ailment?limit=22`)
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

// Fetch all abilities
export function useAbilities() {
  return useQuery([`abilities`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/ability?limit=267`)
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

// Fetch all types
export function useTypes() {
  return useQuery([`types`], () =>
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

// Fetch all machines
export function useMachines() {
  return useQuery([`machines`], () =>
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

// Fetch all items
export function useItems() {
  return useQuery([`items`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/item?limit=1608`)
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

// Fetch all locations
export function useLocations() {
  return useQuery([`locations`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/region?limit=7`)
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

// Fetch single pokemon
export function usePokemon(url: string) {
  return useQuery([`pokemon`, url], () =>
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

// Fetch single move
export function useMove(url: string) {
  return useQuery([`move`, url], () =>
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

// Fetch single ability
export function useAbility(url: string) {
  return useQuery([`ability`, url], () =>
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

// Fetch single pokemon species
export function useSpecies(url: string) {
  return useQuery([`species`, url], () =>
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

// Fetch location for a single pokemon
export function usePokemonLocation(url: string) {
  return useQuery([`pokemonLocation`, url], () =>
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

// Fetch evolution chain of a single pokemon
export function useEvolution(url: string) {
  return useQuery([`evolution`, url], () =>
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

// Fetch single type
export function useType(url: string) {
  return useQuery([`type`, url], () =>
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

// Fetch single item
export function useItem(url: string) {
  return useQuery([`item`, url], () =>
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

// Fetch single location
export function useLocation(url: string) {
  return useQuery([`location`, url], () =>
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

// Fetch single area
export function useArea(url: string) {
  return useQuery([`area`, url], () =>
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
