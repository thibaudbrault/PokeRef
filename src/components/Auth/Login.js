import React, { useState } from 'react'
import { AuthBtn, AuthContainer, AuthCreate, AuthInput, AuthPwd, AuthSection } from './StyledAuth'
import eye from './Images/eye.svg'
import eyeSlash from './Images/eye-slash.svg'
import { Link } from 'react-router-dom';

function Login() {

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange =(evnt)=>{
      setPasswordInput(evnt.target.value);
  }
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  return (
    <AuthSection>
      <AuthContainer>
        <form>
        <h2>Sign In to your account</h2>
          <AuthInput>
            <label htmlFor="signInUser">Username</label>
            <input type="text" name="user" required />
          </AuthInput>
          <AuthInput>
            <label htmlFor="signInEmail">Email address</label>
            <input type="email" name="email" required />
          </AuthInput>
          <AuthInput>
            <div>
              <label htmlFor="signInPwd">Password</label>
            </div>
            <AuthPwd>
              <input type={passwordType} value={passwordInput} onChange={handlePasswordChange} name="pwd" required />
              <button onClick={togglePassword}>
                { passwordType==="password" ? <img src={eye} alt="Show password" width='25' /> : <img src={eyeSlash} alt="Hide password" width='25' /> }
              </button>
            </AuthPwd>
          </AuthInput>
          <AuthBtn type="submit">Sign In</AuthBtn>
        </form>
      </AuthContainer>
      <AuthCreate>
        <p>No account ? <Link to={`/register`}>Create an account</Link></p>
      </AuthCreate>
    </AuthSection>
  )
}

export default Login