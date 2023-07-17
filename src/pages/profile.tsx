import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Loader, errorToast } from '@/components';
import styles from '@/modules/profile/Profile.module.scss';
import { capitalize } from '@/utils';
import { type GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

function Profile() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/', '/', {});
    },
  });

  console.log(session);

  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: user,
  // }: UseQueryResult<User, Error> = useQuery({
  //   queryKey: [`user`, name],
  //   queryFn: () => getMove(name),
  // });

  const releaseHandler = async (name: string, img: string) => {
    if (true /* change to check if auth */) {
      try {
        // will have the release pokemon function
        // return <SuccessToast text={`You released ${capitalize(name)}`} />;
      } catch (error) {
        if (error instanceof Error) {
          errorToast(error.message);
        }
      }
    }
  };

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      username: ``,
      email: ``,
    },
  });

  const submitForm = async (data) => {
    try {
      if (true /* change to check if auth */) {
        // will put the new info in the db
        // return <SuccessToast text="Your profile is modified" />;
      }
    } catch (error) {
      if (error instanceof Error) {
        errorToast(error.message);
      }
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  if (status === 'loading' && isLoading) {
    return <Loader />;
  }

  return (
    <main className="mainBig">
      <section className="section">
        {/* <h2 className="leftH2">{user.name}'s caught pokémon</h2>
          <h4 className="leftSubtitle">
            You caught {user.caught.length} / 1010 Pokémon
          </h4>
          <ul className={styles.caught}>
            {user?.caught.map((p: string[], index: number) => (
              <li key={p[index]}>
                <Image src={p[1]} alt="" width={96} height={96} />
                <Link
                  href={{
                    pathname: `/pokemon/[name]`,
                    query: { name: p[0] },
                  }}
                >
                  {removeDash(p[0])}
                </Link>
                <button onClick={() => releaseHandler(p[0], p[1])}>
                  Release
                </button>
              </li>
            ))}
          </ul> */}
      </section>
      <section className="section">
        <details className={styles.details}>
          <summary>Modify your profile</summary>
          {/* <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
              <div className="input">
                <Label.Root htmlFor="username">Your trainer name</Label.Root>
                <Input
                  type="text"
                  id="username"
                  placeholder={user.name}
                  {...register(`username`)}
                />
              </div>
              <div className="input">
                <Label.Root htmlFor="email">Your email</Label.Root>
                <Input
                  type="text"
                  id="email"
                  placeholder={user.email}
                  {...register(`email`)}
                />
              </div>
              <button type="submit">Update</button>
            </form> */}
        </details>
      </section>
    </main>
  );
}

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
