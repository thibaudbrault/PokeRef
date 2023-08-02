import { zodResolver } from '@hookform/resolvers/zod';
import { FiX } from '@meronex/icons/fi';
import { GrGithub, GrGoogle } from '@meronex/icons/gr';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input, Spinner, errorToast, successToast } from '@/components';
import styles from '@/modules/auth/Auth.module.scss';
import { LoginValidator, capitalize } from '@/utils';

type LoginCredentials = z.infer<typeof LoginValidator>;

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginValidator),
  });

  const { mutate: loginHandler, isLoading } = useMutation({
    mutationFn: async (values: LoginCredentials) => {
      try {
        await signIn(`credentials`, { ...values, callbackUrl: `/` });
        await router.push(`/`);
        successToast(`You are logged in`);
      } catch (error) {
        if (error instanceof AxiosError) {
          errorToast(error.response?.data.message);
        }
      }
    },
  });

  return (
    <main className="mainForm">
      <div className={styles.container}>
        <Link className={styles.close} href={`/`}>
          <FiX />
        </Link>
        <div className={styles.image} />
        <form
          className={styles.form}
          onSubmit={handleSubmit((values) => loginHandler(values))}
        >
          <div className={styles.titleContainer}>
            <h2 className="h2">Login</h2>
            <p>
              Go to your profile to create teams and find your favorites pokémon
            </p>
          </div>
          <fieldset className={styles.input}>
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
              <button className={styles.reset} type="button">
                J'ai oublié mon mot de passe
              </button>
            </div>
            <Button intent="authPrimary" size="large" type="submit">
              {isLoading ? <Spinner /> : `Login`}
            </Button>
          </fieldset>
          <p className={styles.choice}>OR</p>
          <div className={styles.input}>
            <div className={styles.providers}>
              <Button
                intent="authSecondary"
                size="large"
                logo="withLogo"
                // onClick={googleConnect}
              >
                Sign In with Google
                <span>
                  <GrGoogle />
                </span>
              </Button>
              <Button
                intent="authSecondary"
                size="large"
                logo="withLogo"
                onClick={() =>
                  signIn(`github`, {
                    callbackUrl: `${process.env.NEXTAUTH_URL}`,
                  })
                }
              >
                Sign In with Github
                <span>
                  <GrGithub />
                </span>
              </Button>
            </div>
          </div>
          <p className={styles.switch}>
            Don't have an account yet ?{` `}
            <Link href="/register">Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
