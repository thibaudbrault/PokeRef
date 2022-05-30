import React, { useState } from 'react'
import { AuthBtn, AuthContainer, AuthInput, AuthPwd, AuthSection } from './StyledAuth'
import eye from './Images/eye.svg'
import eyeSlash from './Images/eye-slash.svg'

function Login() {

  const [passwordType, setPasswordType] = useState("password");
  const [otherPasswordType, setOtherPasswordType] = useState("password");

  const [passwordInput, setPasswordInput] = useState("");
  const [otherPasswordInput, setOtherPasswordInput] = useState("");
  const handlePasswordChange =(evnt)=>{
    setPasswordInput(evnt.target.value);
  }
  const handleOtherPasswordChange =(evnt)=>{
    setOtherPasswordInput(evnt.target.value);
  }

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const otherTogglePassword =()=>{
    if(otherPasswordType==="password")
    {
     setOtherPasswordType("text")
     return;
    }
    setOtherPasswordType("password")
  }

  return (
    <AuthSection>
      <AuthContainer style={{ borderRadius: '5px' }}>
        <form>
        <h2>Create an account</h2>
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
          <AuthInput>
            <div>
              <label htmlFor="signInPwd">Confirm password</label>
            </div>
            <AuthPwd>
              <input type={otherPasswordType} value={otherPasswordInput} onChange={handleOtherPasswordChange} name="pwd" required />
              <button onClick={otherTogglePassword}>
                { otherPasswordType==="password" ? <img src={eye} alt="Show password" width='25' /> : <img src={eyeSlash} alt="Hide password" width='25' /> }
              </button>
            </AuthPwd>
          </AuthInput>
          <AuthBtn type="submit">Sign Up</AuthBtn>
        </form>
      </AuthContainer>
    </AuthSection>
  )
}

export default Login