import React from 'react';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import {
    AuthBtn,
    AuthButtons,
    AuthContainer,
    AuthForm,
    AuthImage,
    AuthInput,
    AuthSecBtn,
    AuthTitle,
} from '../components/Auth/StyledAuth';
import { H2 } from '../components/BaseStyles/Headings';
import { MainAuth } from '../components/BaseStyles/Sizing';
import GrGoogle from '@meronex/icons/gr/GrGoogle';
import GrGithub from '@meronex/icons/gr/GrGithub';

function Login() {
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
                <AuthForm>
                    <AuthTitle>
                        <H2>Login</H2>
                        <p>
                            Go to your profile to create teams and find your favorites pokémon
                        </p>
                    </AuthTitle>
                    <AuthInput>
                        <input type='email' name='email' id='email' placeholder='Email' />
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                        />
                        <AuthBtn type='submit'>Login</AuthBtn>
                    </AuthInput>
                    <p>OR</p>
                    <AuthInput>
                        <AuthButtons>
                            <AuthSecBtn type='button' onClick={handleGoogleSignIn}>
                                Sign In with Google
                                <span>
                                    <GrGoogle />
                                </span>
                            </AuthSecBtn>
                            <AuthSecBtn type='button' onClick={handleGithubSignIn}>
                                Sign In with Github
                                <span>
                                    <GrGithub />
                                </span>
                            </AuthSecBtn>
                        </AuthButtons>
                        <p>
                            Don't have an account yet ? <Link href="/register">Register</Link>
                        </p>
                    </AuthInput>
                </AuthForm>
            </AuthContainer>
        </MainAuth>
    );
}

export default Login;
