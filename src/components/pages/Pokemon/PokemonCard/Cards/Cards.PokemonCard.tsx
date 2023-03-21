import { Bold, H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { ICard } from '@/types/Cards/Card';
import Image from 'next/image';
import { useState } from 'react';
import { PokemonCardList, PokemonCardModal } from './Styled.Cards.PokemonCard';

type Props = {
    cards: ICard[];
}

function Cards({ cards }: Props) {

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<string | null>(null);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <Section>
            <H3>Cards</H3>
            <PokemonCardList>
                {cards.map(c =>
                    <li>
                        <button
                            onClick={() => {
                                openModal();
                                setModalData(c.images.large)
                            }}
                        >
                            <Image
                                src={c.images.small}
                                alt={''}
                                width={220}
                                height={308}
                            />
                        </button>
                        <p>Set: <Bold>{c.set.name}</Bold></p>
                    </li>
                )}
                {modalData && (
                    <PokemonCardModal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        preventScroll={true}
                        closeTimeoutMS={500}
                    >
                        <Image
                            src={modalData}
                            alt={''}
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </PokemonCardModal>
                )}
            </PokemonCardList>
        </Section>
    )
}

export default Cards