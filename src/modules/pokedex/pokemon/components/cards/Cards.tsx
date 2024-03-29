import { useState } from 'react';

import Image from 'next/image';
import Modal from 'react-modal';

import styles from './Cards.module.scss';

import type { ICard } from '@/types';

type Props = {
  cards: ICard[];
};

export function Cards({ cards }: Props) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className="section" id="cards">
      <h3 className="h3">Cards</h3>
      <ul className={styles.list}>
        {cards.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => {
                openModal();
                setModalData(c.images.large);
              }}
            >
              <Image src={c.images.small} alt={``} width={220} height={308} />
            </button>
            <p>
              Set:{` `}
              <span className="bold">{c.set.name.replaceAll(`—`, ` `)}</span>
            </p>
          </li>
        ))}
        {modalData && (
          <Modal
            className={styles.modal}
            overlayClassName={styles.overlay}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            preventScroll={true}
            closeTimeoutMS={500}
          >
            <Image
              src={modalData}
              alt={``}
              width={0}
              height={0}
              sizes="100vw"
            />
          </Modal>
        )}
      </ul>
    </section>
  );
}
