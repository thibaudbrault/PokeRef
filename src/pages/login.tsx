import { H2 } from '@/components/common/styles/Headings';
import { MainBig, MainForm } from '@/components/common/styles/Sizing';
import {
  AuthBtn,
  AuthButtons,
  AuthChoice,
  AuthClose,
  AuthContainer,
  AuthForm,
  AuthImage,
  AuthInput,
  AuthSecBtn,
  AuthSwitch,
  AuthTitle,
} from '@/components/pages/Auth/Styled.Auth';
import { auth, signInWithGithub, signInWithGoogle } from '@/firebase-config';
import { yupResolver } from '@hookform/resolvers/yup';
import { GrGithub, GrGoogle } from '@meronex/icons/gr';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { FiX } from '@meronex/icons/fi';

type FormInput = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const submitForm = async (data: FormInput) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success(`Welcome back 👋`, {
        style: {
          fontSize: `1.7rem`,
        },
      });
      router.push(`/`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      }
    }
  };

  const googleConnect = () => {
    signInWithGoogle();
    router.push(`/`);
  };

  const githubConnect = () => {
    signInWithGithub();
    router.push(`/`);
  };

  return (
    <MainForm>
      <AuthContainer>
        <AuthClose href={'/'}>
          <FiX />
        </AuthClose>
        <AuthImage />
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
                id="email"
                placeholder="Email"
                {...register(`email`)}
              />
              {typeof errors.email?.message === `string` && (
                <small>{errors.email?.message}</small>
              )}
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`password`)}
              />
              {typeof errors.password?.message === `string` && (
                <small>{errors.password?.message}</small>
              )}
            </div>
            <AuthBtn type="submit">Login</AuthBtn>
          </AuthInput>
          <AuthChoice>OR</AuthChoice>
          <AuthInput>
            <AuthButtons>
              <AuthSecBtn type="button" onClick={googleConnect}>
                Sign In with Google
                <span>
                  <GrGoogle />
                </span>
              </AuthSecBtn>
              <AuthSecBtn type="button" onClick={githubConnect}>
                Sign In with Github
                <span>
                  <GrGithub />
                </span>
              </AuthSecBtn>
            </AuthButtons>
          </AuthInput>
          <AuthSwitch>
            Don't have an account yet ?{` `}
            <Link href="/register">Register</Link>
          </AuthSwitch>
        </AuthForm>
      </AuthContainer>
    </MainForm>
  );
}

export default Login;
