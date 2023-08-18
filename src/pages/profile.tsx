import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Label from '@radix-ui/react-label';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorToast, Input, SuccessToast } from '@/components';
import styles from '@/modules/profile/Profile.module.scss';
import { capitalize, removeDash } from '@/utils';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
});

type FormInput = yup.Asserts<typeof schema>;

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState();

  const releaseHandler = async (name: string, img: string) => {
    if (true /* change to check if auth */) {
      try {
        // will have the release pokemon function
        return <SuccessToast text={`You released ${capitalize(name)}`} />;
      } catch (error) {
        if (error instanceof Error) {
          return <ErrorToast error={error} />;
        }
      }
    }
  };

  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(schema),
    defaultValues: {
      username: ``,
      email: ``,
    },
  });

  const submitForm = async (data: FormInput) => {
    try {
      if (true /* change to check if auth */) {
        // will put the new info in the db
        return <SuccessToast text="Your profile is modified" />;
      }
    } catch (error) {
      if (error instanceof Error) {
        return <ErrorToast error={error} />;
      }
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    user && (
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
    )
  );
}

export default Profile;
