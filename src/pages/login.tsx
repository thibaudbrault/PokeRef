import React from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
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
} from '../components/Auth/StyledAuth';
import { H2 } from '../components/Common/Headings';
import { MainAuth } from '../components/Common/Sizing';
import GrGoogle from '@meronex/icons/gr/GrGoogle';
import GrGithub from '@meronex/icons/gr/GrGithub';

type FormInput = {
  email: string,
  password: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const submitForm = (data: FormInput) => {
    console.log(data);
  };

  async function handleGoogleSignIn() {
    await signIn(`google`, { callbackUrl: `http://localhost:3000` });
  }

  async function handleGithubSignIn() {
    await signIn(`github`, { callbackUrl: `http://localhost:3000` });
  }

  return (
    <MainAuth>
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
              <input type="email" id="email" placeholder="Email" {...register("email")} />
              {typeof errors.email?.message === 'string' &&
                <p>{errors.email?.message}</p>
              }
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
              {typeof errors.password?.message === 'string' &&
                <p>{errors.password?.message}</p>
              }
            </div>
            <AuthBtn type="submit">Login</AuthBtn>
          </AuthInput>
          <AuthChoice>OR</AuthChoice>
          <AuthInput>
            <AuthButtons>
              <AuthSecBtn type="button" onClick={handleGoogleSignIn}>
                Sign In with Google
                <span>
                  <GrGoogle />
                </span>
              </AuthSecBtn>
              <AuthSecBtn type="button" onClick={handleGithubSignIn}>
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
    </MainAuth>
  );
}

export default Login;