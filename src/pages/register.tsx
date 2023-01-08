import React from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase-config';
import { doc, setDoc } from 'firebase/firestore/lite';

import {
  AuthBtn,
  AuthContainer,
  AuthForm,
  AuthImage2,
  AuthInput,
  AuthSwitch,
  AuthTitle,
} from '@/components/pages/Auth/Styled.Auth';
import { H2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { toast } from 'react-hot-toast';

type FormInput = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    cpassword: yup.string().oneOf([yup.ref(`password`), null]),
  })
  .required();

function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const submitForm = async (data: FormInput) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
      await setDoc(usersCollectionRef, {
        name: data.username,
        email: data.email,
      });
      toast.success(`Congrats 🎉! Your account is now created`, {
        style: {
          fontSize: `1.7rem`,
        },
      });
      router.push(`/`);
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

  return (
    <MainBig>
      <AuthContainer>
        <AuthImage2></AuthImage2>
        <AuthForm onSubmit={handleSubmit(submitForm)}>
          <AuthTitle>
            <H2>Register</H2>
            <p>Create teams and save your favorites pokémon</p>
          </AuthTitle>
          <AuthInput>
            <div>
              <input
                type="text"
                id="username"
                placeholder="Username"
                {...register(`username`)}
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                {...register(`email`)}
              />
              {typeof errors.email?.message === `string` && (
                <p>{errors.email?.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`password`)}
              />
            </div>
            <div>
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                {...register(`cpassword`)}
              />
            </div>
            <AuthBtn type="submit">Register</AuthBtn>
          </AuthInput>
          <AuthSwitch>
            Already have an account ? <Link href="/login">Login</Link>
          </AuthSwitch>
        </AuthForm>
      </AuthContainer>
    </MainBig>
  );
}

export default Register;
