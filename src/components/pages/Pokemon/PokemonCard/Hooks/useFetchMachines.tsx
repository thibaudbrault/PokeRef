import { IMove } from '@/types/Moves/Move';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchMachines = (
  pokemon: IPokemon,
  version: string,
  name: string,
) => {
  // Same function than filteredMoves but the learn method is not a variable but is already defined
  const filteredMachines = pokemon.moves
    .map((m) => {
      const version_group_details = m.version_group_details.filter(
        (mv) =>
          mv.version_group.name === version &&
          mv.move_learn_method.name === `machine`,
      );
      return {
        ...m,
        version_group_details,
      };
    })
    .filter((m) => m.version_group_details.length);

  // Fetch a move's data from the filtered machines
  // Does not return a machine details with the name of the machine but the moves details
  const getFilteredMachines = async () => {
    const res = filteredMachines.map(async (m) => {
      const machineUrl = m.move.url;
      return await axios.get(machineUrl).then((res) => res.data);
    });
    const results = await Promise.all(res);
    return results;
  };

  // Temporary data that will be used to do a second fetching because the part needed (the machine name like TM01) is contained in another object
  const { data: tmpMachines }: UseQueryResult<IMove[]> = useQuery({
    queryKey: [`tmpMachines`, version, name],
    queryFn: getFilteredMachines,
    enabled: !!filteredMachines,
  });

  // New filter on the temporary details to get the url of the machine for the version selected
  const machinesByVersion = tmpMachines
    ?.map((m) =>
      m.machines
        .filter((ma) => ma.version_group.name === version)
        .map((ma) => ma.machine.url),
    )
    .flat();

  // New fetch on the second filtered machines
  const getMachinesDetails = async () => {
    if (machinesByVersion) {
      const res = machinesByVersion?.map(async (m) => {
        return await axios.get(m).then((res) => res.data);
      });
      const results = await Promise.all(res);
      return results;
    }
  };

  // Finally, the data returned contains the machine's name
  const { data: machines } = useQuery({
    queryKey: [`pokemonMachines`, version, name],
    queryFn: getMachinesDetails,
    enabled: !!machinesByVersion,
  });

  return { machines };
};
