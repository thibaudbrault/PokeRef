import { useState } from 'react';

import { MdAdd, MdRemove } from '@meronex/icons/ios';

import styles from './Content.module.scss';

type Props = {
  hasForm: boolean;
};

export function Content({ hasForm }: Props) {
  const [contentsOpen, setContentsOpen] = useState<boolean>(false);

  return (
    <section className={styles.section}>
      <div>
        <p>Table of contents</p>
        <button onClick={() => setContentsOpen(!contentsOpen)}>
          {contentsOpen ? <MdRemove /> : <MdAdd />}
        </button>
      </div>
      {contentsOpen && (
        <ol>
          <li>
            <a href="#generations">Generations</a>
          </li>
          <li>
            <a href="#presentation">Presentation</a>
          </li>
          <li>
            <a href="#evolution">Evolution</a>
          </li>
          <li>
            <a href="#information">Information</a>
          </li>
          <li>
            <a href="#stats">Stats</a>
          </li>
          <li>
            <a href="#types">Types</a>
          </li>
          <li>
            <a href="#moves">Moves</a>
          </li>
          <li>
            <a href="#locations">Locations</a>
          </li>
          {hasForm && (
            <li>
              <a href="#forms">Forms</a>
            </li>
          )}
          <li>
            <a href="#competitive">Competitive</a>
          </li>
          <li>
            <a href="#sprites">Sprites</a>
          </li>
          <li>
            <a href="#cards">Cards</a>
          </li>
        </ol>
      )}
    </section>
  );
}
