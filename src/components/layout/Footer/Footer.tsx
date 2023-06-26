import { FaGithub } from '@meronex/icons/fa';
import styles from './Footer.module.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <div className={styles.left}>© {year} PokéRef</div>
        <div className={styles.center}>PokéRef</div>
        <div className={styles.right}>
          <a
            href="https://github.com/thibaudbrault/PokeRef"
            aria-label="Github"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
