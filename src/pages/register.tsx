import React from 'react';
import Link from 'next/link';
import {
  AuthBtn,
  AuthContainer,
  AuthForm,
  AuthImage2,
  AuthInput,
  AuthTitle,
} from '../components/Auth/StyledAuth';
import { H2 } from '../components/Common/Headings';
import { MainAuth } from '../components/Common/Sizing';

function Register() {
  return (
    <MainAuth>
      <AuthContainer>
        <AuthImage2></AuthImage2>
        <AuthForm>
          <AuthTitle>
            <H2>Register</H2>
            <p>Create teams and save your favorites pokémon</p>
          </AuthTitle>
          <AuthInput>
            <div>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>
            <div>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Password"
              />
            </div>
            <AuthBtn type="submit">Register</AuthBtn>
          </AuthInput>
          <AuthInput>
            <p>
              Already have an account ? <Link href="/login">Login</Link>
            </p>
          </AuthInput>
        </AuthForm>
      </AuthContainer>
    </MainAuth>
  );
}

export default Register;
