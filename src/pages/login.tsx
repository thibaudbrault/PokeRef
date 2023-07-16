import { FiX } from '@meronex/icons/fi';
import { GrGithub, GrGoogle } from '@meronex/icons/gr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button, Input, Spinner, errorToast, successToast } from '@/components';
import styles from '@/modules/auth/Auth.module.scss';
import { LoginValidator, capitalize } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import * as Dialog from '@radix-ui/react-dialog';

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
        // const { data } = await axios.post('/api/user/signin', values);
        await signIn('credentials', { ...values, callbackUrl: '/' });
        // router.push('/profile');
        successToast('You are logged in');
      } catch (error) {
        if (error instanceof AxiosError) {
          errorToast(error.response?.data.message);
        }
      }
    },
  });

  const googleConnect = () => {
    // will have the sign-in with google call
    router.push(`/`);
  };

  const githubConnect = () => {
    // will have the sign-in with github call
    router.push(`/`);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button intent="secondary">Login</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.titleContainer}>
                <Dialog.Title className="DialogTitle">Login</Dialog.Title>
                <Dialog.Description className="DialogDescription">
                  Go to your profile to create teams and find your favorites
                  pokémon
                </Dialog.Description>
              </div>
              <form
                className={styles.form}
                onSubmit={handleSubmit((values) => loginHandler(values))}
              >
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
                      I forgot my password
                    </button>
                  </div>
                  <Button intent="primary" size="large" type="submit">
                    {isLoading ? <Spinner /> : `Login`}
                  </Button>
                </fieldset>
                <p className={styles.choice}>OR</p>
                <fieldset className={styles.input}>
                  <div className={styles.providers}>
                    <Button
                      intent="secondary"
                      size="large"
                      logo="withLogo"
                      onClick={googleConnect}
                    >
                      Sign In with Google
                      <span>
                        <GrGoogle />
                      </span>
                    </Button>
                    <Button
                      intent="secondary"
                      size="large"
                      logo="withLogo"
                      onClick={githubConnect}
                    >
                      Sign In with Github
                      <span>
                        <GrGithub />
                      </span>
                    </Button>
                  </div>
                </fieldset>
                <p className={styles.switch}>
                  Don't have an account yet ?{` `}
                  <Link href="/register">Register</Link>
                </p>
              </form>
            </div>
          </main>
          <Dialog.Close asChild>
            <Button intent="close">
              <FiX />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Login;
