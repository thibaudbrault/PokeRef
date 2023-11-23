import { useEffect } from 'react';

import { FiX } from '@meronex/icons/fi';
import { GrGithub, GrGoogle } from '@meronex/icons/gr';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@/components';
import styles from '@/modules/auth/Auth.module.scss';

function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/`);
    }
  }, [session]);

  return (
    <main className="mainForm">
      <div className={styles.page}>
        <Link className={styles.close} href={`/`}>
          <FiX />
        </Link>
        <div className={styles.image} />
        <div className={styles.container}>
          <section className={styles.title}>
            <h2 className="h2">Login</h2>
            <p>
              Go to your profile to create teams and find your favorites pokémon
            </p>
          </section>
          <section className={styles.providers}>
            <Button
              intent="authSecondary"
              size="large"
              logo="withLogo"
              type="button"
              onClick={() =>
                signIn(`google`, {
                  callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}`,
                })
              }
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
              type="button"
              onClick={() =>
                signIn(`github`, {
                  callbackUrl: process.env.NEXT_PUBLIC_SITE_URL,
                })
              }
            >
              Sign In with Github
              <span>
                <GrGithub />
              </span>
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Login;
