import { LeftH2, LeftSubtitle } from '@/components/common/styles/Headings';
import { Input } from '@/components/common/styles/Inputs';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import { auth, db } from '@/firebase-config';
import {
  ProfileCaught,
  ProfileDetails,
  ProfileForm,
} from '@/modules/profile/Styled.Profile';
import { capitalize, removeDash } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  arrayRemove,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

type FormInput = {
  username: string;
  email: string;
};

const schema = yup
  .object({
    username: yup.string(),
    email: yup.string().email(),
  })
  .required();

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
        toast.success(`You released ${capitalize(name)}`, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            style: {
              fontSize: `1.7rem`,
            },
          });
        }
      }
    }
  };

  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
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
        toast.success(`Your profile is modified`, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      }
    }
  };

  const _deleteAccount = async () => {
    if (auth.currentUser) {
      try {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await deleteDoc(usersCollectionRef);
        await auth.currentUser.delete();
        toast.success(`Congrats 🎉! Your account is now created`, {
          style: {
            fontSize: `1.7rem`,
          },
        });
        router.push(`/`);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            style: {
              fontSize: `1.7rem`,
            },
          });
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
      <MainBig>
        <Section>
          <LeftH2>{user.name}'s caught pokémon</LeftH2>
          <LeftSubtitle>
            You caught {user.caught.length} / 1010 Pokémon
          </LeftSubtitle>
          <ProfileCaught>
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
          </ProfileCaught>
        </Section>
        <Section>
          <ProfileDetails>
            <summary>Modify your profile</summary>
            <ProfileForm onSubmit={handleSubmit(submitForm)}>
              <Input>
                <label htmlFor="username">Your trainer name</label>
                <input
                  type="text"
                  id="username"
                  placeholder={user.name}
                  {...register(`username`)}
                />
              </Input>
              <Input>
                <label htmlFor="email">Your email</label>
                <input
                  type="text"
                  id="email"
                  placeholder={user.email}
                  {...register(`email`)}
                />
              </Input>
              <button type="submit">Update</button>
            </ProfileForm>
          </ProfileDetails>
        </Section>
      </MainBig>
    )
  );
}

export default Profile;
