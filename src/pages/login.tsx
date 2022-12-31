import React from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AuthBtn,
  AuthButtons,
  AuthChoice,
  AuthContainer,
  AuthForm,
  AuthImage,
  AuthInput,
  AuthSecBtn,
  AuthSwitch,
  AuthTitle,
} from '@/components/pages/Auth/Styled.Auth';
import { H2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { GrGoogle } from '@meronex/icons/gr';
import { GrGithub } from '@meronex/icons/gr';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGithub, signInWithGoogle } from '@/firebase';
import { useRouter } from 'next/router';

type FormInput = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

function Login() {
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
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push(`/`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const googleConnect = () => {
    signInWithGoogle();
    router.push(`/`);
  };

  const githubConnect = () => {
    signInWithGithub();
    router.push(`/`);
  };

  return (
    <MainBig>
      <AuthContainer>
        <AuthImage></AuthImage>
        <AuthForm onSubmit={handleSubmit(submitForm)}>
          <AuthTitle>
            <H2>Login</H2>
            <p>
              Go to your profile to create teams and find your favorites pokémon
            </p>
          </AuthTitle>
          <AuthInput>
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
              {typeof errors.password?.message === `string` && (
                <p>{errors.password?.message}</p>
              )}
            </div>
            <AuthBtn type="submit">Login</AuthBtn>
          </AuthInput>
          <AuthChoice>OR</AuthChoice>
          <AuthInput>
            <AuthButtons>
              <AuthSecBtn type="button" onClick={googleConnect}>
                Sign In with Google
                <span>
                  <GrGoogle />
                </span>
              </AuthSecBtn>
              <AuthSecBtn type="button" onClick={githubConnect}>
                Sign In with Github
                <span>
                  <GrGithub />
                </span>
              </AuthSecBtn>
            </AuthButtons>
            <AuthSwitch>
              Don't have an account yet ?{` `}
              <Link href="/register">Register</Link>
            </AuthSwitch>
          </AuthInput>
        </AuthForm>
      </AuthContainer>
    </MainBig>
  );
}

export default Login;
