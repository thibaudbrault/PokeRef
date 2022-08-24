import React, { useState, useContext, useRef } from 'react';
import { UserContext } from '../../helpers/userContext';
import { Navigate } from 'react-router-dom';

import {
	AuthBtn,
	AuthContainer,
	AuthCreate,
	AuthInput,
	AuthPwd,
	AuthSection,
	ValidateText,
} from './StyledAuth';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs'

function Login() {

	const { signIn } = useContext(UserContext);

	const inputs = useRef([]);
	const addInputs = (el) => {
		if (el && !inputs.current.includes(el)) {
			inputs.current.push(el);
		}
	};

	const formRef = useRef();

	const [validation, setValidation] = useState('');

	const handleForm = async (e) => {
		e.preventDefault();

		try {
			await signIn(
				inputs.current[0].value,
				inputs.current[1].value
			);
			formRef.current.reset();
			setValidation('');
			return <Navigate to='/profile' />;
		} catch {
			setValidation('Email and / or password is incorrect');
		}
	};

	const [passwordType, setPasswordType] = useState('password');
	const togglePassword = () => {
		if (passwordType === 'password') {
			setPasswordType('text');
			return;
		}
		setPasswordType('password');
	};

	return (
		<AuthSection>
			<AuthContainer>
				<form ref={formRef} onSubmit={handleForm}>
					<h2>Sign In to your account</h2>
					<AuthInput>
						<label htmlFor='signInEmail'>Email address</label>
						<input ref={addInputs} type='email' name='email' required />
					</AuthInput>
					<AuthInput>
						<div>
							<label htmlFor='signInPwd'>Password</label>
						</div>
						<AuthPwd>
							<input
								ref={addInputs}
								type={passwordType}
								name='pwd'
								required
							/>
							<button onClick={togglePassword}>
								{passwordType === 'password' ? (
									<BsEye />
								) : (
									<BsEyeSlash />
								)}
							</button>
						</AuthPwd>
						<ValidateText>{validation}</ValidateText>
					</AuthInput>
					<AuthBtn>Sign In</AuthBtn>
				</form>
			</AuthContainer>
			<AuthCreate>
				<p>
					No account ? <Link to={`/register`}>Create one now</Link>
				</p>
			</AuthCreate>
		</AuthSection>
	);
}

export default Login;
