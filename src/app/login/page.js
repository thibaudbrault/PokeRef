import React from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn, signOut } from 'next-auth/react';
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
import { H2 } from '../components/BaseStyles/Headings';
import { MainAuth } from '../components/BaseStyles/Sizing';
import GrGoogle from '@meronex/icons/gr/GrGoogle';
import GrGithub from '@meronex/icons/gr/GrGithub';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => { };

  async function handleGoogleSignIn() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }

  async function handleGithubSignIn() {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
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
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <p>{errors.email?.message}</p>
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <p>{errors.password?.message}</p>
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
              Don't have an account yet ? <Link href="/register">Register</Link>
            </AuthSwitch>
          </AuthInput>
        </AuthForm>
      </AuthContainer>
    </MainAuth>
  );
}

export default Login;
