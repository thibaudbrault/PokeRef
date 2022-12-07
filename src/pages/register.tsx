import React from 'react';
import Link from 'next/link';
import * as yup from 'yup';

import {
  AuthBtn,
  AuthContainer,
  AuthForm,
  AuthImage2,
  AuthInput,
  AuthSwitch,
  AuthTitle,
} from '../components/Auth/StyledAuth';
import { H2 } from '../components/Common/Headings';
import { MainAuth } from '../components/Common/Sizing';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

  return (
    <MainAuth>
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
    </MainAuth>
  );
}

export default Register;
