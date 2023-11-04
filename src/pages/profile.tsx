// @ts-nocheck

import { Caught, User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Loader, errorToast, successToast } from '@/components';
import styles from '@/modules/profile/Profile.module.scss';
import { removeDash } from '@/utils';
import { prisma } from '~/lib/prisma';

import { authOptions } from './api/auth/[...nextauth]';

function Profile(props: User & Caught) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/`, `/`, {});
    },
  });

  const { mutate: releaseHandler } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { data } = await axios.delete(`/api/caught/release?id=${id}`);
        successToast(data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          errorToast(error.response?.data.message);
        }
      }
    },
  });

  if (status === `loading`) {
    return <Loader />;
  }

  return (
    <main className="mainBig">
      <section className="section">
        <h2 className="leftH2">{props.name}'s caught pokémon</h2>
        <h4 className="leftSubtitle">
          You caught {props.caught.length} / 1010 Pokémon
        </h4>
        <ul className={styles.caught}>
          {props.caught.map((pokemon: Caught, index: number) => (
            <li key={index}>
              <Image src={pokemon.image} alt="" width={96} height={96} />
              <Link
                href={{
                  pathname: `/pokemon/[name]`,
                  query: { name: pokemon.name },
                }}
              >
                {removeDash(pokemon.name)}
              </Link>
              <button onClick={() => releaseHandler(pokemon.id)}>
                Release
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Profile;

export const config = {
  runtime: `experimental-edge`,
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  const email =
    typeof session.user?.email === `string` ? session.user?.email : undefined;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { caught: true },
  });

  return {
    props: JSON.parse(JSON.stringify(user)),
  };
}
