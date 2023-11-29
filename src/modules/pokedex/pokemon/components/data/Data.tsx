import { Caught, User } from '@prisma/client';
import {
  QueryClient,
  useMutation,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

import { Button, errorToast, successToast } from '@/components';
import { QueryKeys } from '~/src/utils';

import { Base } from './base';
import styles from './Data.module.scss';
import { Description } from './description';
import { Sprite } from './sprite';

import type { IPokemon, IPokemonSpecies } from '@/types';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  game: string;
};

export function Data({ pokemon, species, game }: Props) {
  const { data: session } = useSession();
  const queryClient = new QueryClient();

  const { data: user }: UseQueryResult<User & Caught> = useQuery({
    queryKey: [QueryKeys.USER, session?.user?.email],
    queryFn: async () => {
      try {
        const email = session?.user?.email;
        if (!email) return {};
        const { data } = await axios.get(
          `/api/user/data?email=${encodeURIComponent(email)}`,
          {
            data: { email: session?.user?.email },
          },
        );
        return data.user;
      } catch (error) {
        if (error instanceof AxiosError) {
          errorToast(error.response?.data.message);
        }
      }
    },
  });

  const { mutate: catchHandler } = useMutation({
    mutationFn: async () => {
      try {
        const body = {
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          userEmail: user?.email,
        };
        const { data } = await axios.post(`/api/caught/catch`, body);
        successToast(data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          errorToast(error.response?.data.message);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER, session?.user?.email],
      });
    },
  });

  return (
    <section className={styles.section} id="presentation">
      {user &&
        Object.keys(user).length > 0 &&
        pokemon.id < 10000 &&
        // @ts-ignore
        (user.caught?.every(
          (p: Record<string, string>) => p.name !== pokemon.name,
        ) ? (
          <Button
            intent="primary"
            size="fit"
            className={styles.catch}
            onClick={() => catchHandler()}
          >
            Catch
          </Button>
        ) : (
          <Button intent="secondary" size="fit" className={styles.catch}>
            Caught
          </Button>
        ))}
      <div className={styles.container}>
        <Description species={species} pokemon={pokemon} game={game} />
        <Base species={species} pokemon={pokemon} />
      </div>
      <div className={styles.sprite}>
        <Sprite species={species} pokemon={pokemon} />
      </div>
    </section>
  );
}
