import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Label from '@radix-ui/react-label';
import {
  type DocumentData,
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorToast, Input, SuccessToast } from '@/components';
import { auth, db } from '@/firebase-config';
import styles from '@/modules/profile/Profile.module.scss';
import { capitalize, removeDash } from '@/utils';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
});

type FormInput = yup.Asserts<typeof schema>;

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<DocumentData | undefined>();

  const getUserDoc = async () => {
    if (auth.currentUser) {
      const usersCollectionRef = doc(db, `users`, auth.currentUser.uid);
      const docSnap = await getDoc(usersCollectionRef);
      setUser(docSnap.data());
    }
  };

  const releaseHandler = async (name: string, img: string) => {
    if (auth.currentUser) {
      try {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await updateDoc(usersCollectionRef, {
          caught: arrayRemove({
            0: name,
            1: img,
          }),
        });
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
      if (auth.currentUser) {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await updateDoc(usersCollectionRef, {
          name: data.username !== `` ? data.username : user?.name,
          email: data.email !== `` ? data.email : user?.email,
        });
        return <SuccessToast text="Your profile is modified" />;
      }
    } catch (error) {
      if (error instanceof Error) {
        return <ErrorToast error={error} />;
      }
    }
  };

  const _deleteAccount = async () => {
    if (auth.currentUser) {
      try {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await deleteDoc(usersCollectionRef);
        await auth.currentUser.delete();
        router.push(`/`);
        return <SuccessToast text="Congrats 🎉! Your account is now deleted" />;
      } catch (error) {
        if (error instanceof Error) {
          return <ErrorToast error={error} />;
        }
      }
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/`);
    } else {
      getUserDoc();
      const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
      const unsubscribe = onSnapshot(usersCollectionRef, (doc) => {
        setUser(doc.data());
      });
      return () => {
        unsubscribe();
      };
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    user && (
      <main className="mainBig">
        <section className="section">
          <h2 className="leftH2">{user.name}'s caught pokémon</h2>
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
          </ul>
        </section>
        <section className="section">
          <details className={styles.details}>
            <summary>Modify your profile</summary>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
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
            </form>
          </details>
        </section>
      </main>
    )
  );
}

export default Profile;
