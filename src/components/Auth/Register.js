import React, { useState, useRef, useContext } from 'react';
import {
	AuthBtn,
	AuthContainer,
	AuthInput,
	AuthPwd,
	AuthSection,
	ValidateText,
} from './StyledAuth';
import eye from './Images/eye.svg';
import eyeSlash from './Images/eye-slash.svg';
import { UserContext } from '../../helpers/userContext';
import { useNavigate } from 'react-router-dom';

function Login() {
	const { signUp } = useContext(UserContext);

	const navigate = useNavigate();

	const [passwordType, setPasswordType] = useState('password');
	const [otherPasswordType, setOtherPasswordType] = useState('password');

	// const [passwordInput, setPasswordInput] = useState("");
	// const [otherPasswordInput, setOtherPasswordInput] = useState("");
	// const handlePasswordChange =(evnt)=>{
	//   setPasswordInput(evnt.target.value);
	// }
	// const handleOtherPasswordChange =(evnt)=>{
	//   setOtherPasswordInput(evnt.target.value);
	// }

	const togglePassword = () => {
		if (passwordType === 'password') {
			setPasswordType('text');
			return;
		}
		setPasswordType('password');
	};

	const otherTogglePassword = () => {
		if (otherPasswordType === 'password') {
			setOtherPasswordType('text');
			return;
		}
		setOtherPasswordType('password');
	};

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

		if (
			(inputs.current[2].value.length || inputs.current[3].value.length) < 8
		) {
			setValidation('8 characters min');
			return;
		} else if (inputs.current[2].value !== inputs.current[3].value) {
			setValidation('Passwords do not match');
			return;
		}

		try {
			const cred = await signUp(
				inputs.current[1].value,
				inputs.current[2].value
			);
			formRef.current.reset();
			setValidation('');
			navigate('../../pages/Profile/Profile.js');
		} catch (err) {
			if (err.code === 'auth/invalid-email') {
				setValidation('Email format invalid');
			}

			if (err.code === 'auth/email-already-in-use') {
				setValidation('Email already used');
			}
		}
	};

	return (
		<AuthSection>
			<AuthContainer style={{ borderRadius: '5px' }}>
				<form ref={formRef} onSubmit={handleForm}>
					<h2>Create an account</h2>
					<AuthInput>
						<label htmlFor='signInUser'>Username</label>
						<input ref={addInputs} type='text' name='user' />
					</AuthInput>
					<AuthInput>
						<label htmlFor='signInEmail'>Email address</label>
						<input ref={addInputs} type='email' name='email' required />
					</AuthInput>
					<AuthInput>
						<div>
							<label htmlFor='signInPwd'>Password</label>
						</div>
						<AuthPwd>
							<input ref={addInputs} type={passwordType} name='pwd' required />
							<button onClick={togglePassword}>
								{passwordType === 'password' ? (
									<img src={eye} alt='Show password' width='25' />
								) : (
									<img src={eyeSlash} alt='Hide password' width='25' />
								)}
							</button>
						</AuthPwd>
					</AuthInput>
					<AuthInput>
						<div>
							<label htmlFor='signInPwd'>Confirm password</label>
						</div>
						<AuthPwd>
							<input
								ref={addInputs}
								type={otherPasswordType}
								name='pwd'
								required
							/>
							<button onClick={otherTogglePassword}>
								{otherPasswordType === 'password' ? (
									<img src={eye} alt='Show password' width='25' />
								) : (
									<img src={eyeSlash} alt='Hide password' width='25' />
								)}
							</button>
						</AuthPwd>
						<ValidateText>{validation}</ValidateText>
					</AuthInput>
					<AuthBtn type='submit'>Sign Up</AuthBtn>
				</form>
			</AuthContainer>
		</AuthSection>
	);
}

export default Login;
