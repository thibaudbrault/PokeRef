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

// Fetch all status
export function useStatus() {
  return useQuery<Moves.Status[], Error>([`status`], () =>
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
  return useQuery<Abilities.Abilities[], Error>([`abilities`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/ability?limit=100`)
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

// Fetch all items
export function useItems() {
  return useQuery<Items.Items[], Error>([`items`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/item?limit=2051`)
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
  return useQuery<Locations.Regions[], Error>([`locations`], () =>
    axios
      .get(`https://pokeapi.co/api/v2/region?limit=10`)
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

//Fetch format
export function useFormat(url: string) {
  return useQuery([`format`, url], () =>
    axios.get(url).then((results) => {
      console.log(results.data);
      return results.data;
    }),
  );
}
