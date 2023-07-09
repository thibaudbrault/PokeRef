import { ErrorToast, Input, SuccessToast } from '@/components';
import { auth, signInWithGithub, signInWithGoogle } from '@/firebase-config';
import styles from '@/modules/auth/Auth.module.scss';
import ResetPwd from '@/modules/auth/ResetPwd';
import { capitalize } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiX } from '@meronex/icons/fi';
import { GrGithub, GrGoogle } from '@meronex/icons/gr';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  resetEmail: yup.string().email().required(),
});

type FormInput = yup.Asserts<typeof schema>;

function Login() {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(schema),
  });

  const submitForm = async (data: FormInput) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push(`/`);
      return <SuccessToast text="Welcome back 👋" />;
    } catch (error) {
      if (error instanceof Error) {
        return <ErrorToast error={error} />;
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
    <main className="mainForm">
      <div className={styles.container}>
        <Link className={styles.close} href={`/`}>
          <FiX />
        </Link>
        <div className={styles.image} />
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.title}>
            <h2 className="h2">Login</h2>
            <p>
              Go to your profile to create teams and find your favorites pokémon
            </p>
          </div>
          <div className={styles.input}>
            <div>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                {...register(`email`)}
              />
              {typeof errors.email?.message === `string` && (
                <small>{capitalize(errors.email?.message)}</small>
              )}
            </div>
            <div>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`password`)}
              />
              {typeof errors.password?.message === `string` && (
                <small>{capitalize(errors.password?.message)}</small>
              )}
              <button
                className={styles.reset}
                type="button"
                onClick={openModal}
              >
                J'ai oublié mon mot de passe
              </button>
            </div>
            <button className={styles.button} type="submit">
              Login
            </button>
          </div>
          <p className={styles.choice}>OR</p>
          <div className={styles.input}>
            <div className={styles.providers}>
              <button
                className={styles.secButton}
                type="button"
                onClick={googleConnect}
              >
                Sign In with Google
                <span>
                  <GrGoogle />
                </span>
              </button>
              <button
                className={styles.secButton}
                type="button"
                onClick={githubConnect}
              >
                Sign In with Github
                <span>
                  <GrGithub />
                </span>
              </button>
            </div>
          </div>
          <p className={styles.switch}>
            Don't have an account yet ?{` `}
            <Link href="/register">Register</Link>
          </p>
        </form>
      </div>
      <ResetPwd modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </main>
  );
}

export default Login;
