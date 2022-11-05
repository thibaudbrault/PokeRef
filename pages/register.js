import Link from 'next/link';
import React from 'react';
import {
	AuthBtn,
	AuthContainer,
	AuthForm,
	AuthImage2,
	AuthInput,
	AuthTitle,
} from '../components/Auth/StyledAuth';
import { H2 } from '../components/BaseStyles/Headings';
import { MainAuth } from '../components/BaseStyles/Sizing';

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
						<input
							type='text'
							name='username'
							id='username'
							placeholder='Username'
						/>
						<input type='email' name='email' id='email' placeholder='Email' />
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Password'
						/>
						<input
							type='password'
							name='cpassword'
							id='cpassword'
							placeholder='Confirm Password'
						/>
						<AuthBtn type='submit'>Register</AuthBtn>
					</AuthInput>
					<AuthInput>
						<p>
							Already have an account ? <Link href='/login'>Login</Link>
						</p>
					</AuthInput>
				</AuthForm>
			</AuthContainer>
		</MainAuth>
	);
}

export default Register;
