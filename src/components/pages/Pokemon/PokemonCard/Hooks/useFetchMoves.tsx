import { IMove } from '@/types/Moves/Move';
import { IPokemon, IPokemonMove } from '@/types/Pokemon/Pokemon';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

export interface IMoveWithDetails extends IPokemonMove {
  details: IMove;
}

export const useFetchMoves = (
  pokemon: IPokemon,
  version: string,
  learn: string,
  name: string,
) => {
  // Filter moves learned by a pokemon according to the learn method and version chosen
  // Return an empty array for version_group_details if the move does not pass the conditions of the filter
  // The moves with this empty array are removed from the parent array with the second filter
  const filteredMoves = pokemon.moves
    .map((m) => {
      const version_group_details = m.version_group_details.filter(
        (mv) =>
          mv.version_group.name === version &&
          mv.move_learn_method.name === learn,
      );
      return {
        ...m,
        version_group_details,
      };
    })
    .filter((m) => m.version_group_details.length);

  // Fetch a move's data for the filtered moves. The data is added to the already existing objects contained in the filteredMoves array
  const getFilteredMovesWithDetails = async () => {
    const res = filteredMoves.map(async (m) => {
      const moveUrl = m.move.url;
      const details = await axios.get(moveUrl).then((res) => res.data);
      return {
        ...m,
        details,
      };
    });
    const results = await Promise.all(res);
    return results;
  };

  const {
    isLoading,
    isError,
    error,
    data: pokemonMoves,
  }: UseQueryResult<IMoveWithDetails[], Error> = useQuery({
    queryKey: [`pokemonMoves`, version, learn, name],
    queryFn: getFilteredMovesWithDetails,
  });

  return { isLoading, isError, error, pokemonMoves };
};
