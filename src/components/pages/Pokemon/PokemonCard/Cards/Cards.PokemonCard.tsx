import { Bold, H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import Image from 'next/image';
import { useState } from 'react';
import { PokemonCardList, PokemonCardModal } from './Styled.Cards.PokemonCard';

type Props = {
    cards: any;
}

function Cards({ cards }: Props) {

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [modalImg, setModalImg] = useState<string>('')

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    console.log(cards)

    return (
        <Section>
            <H3>Cards</H3>
            <PokemonCardList>
                {cards.map(c =>
                    <li>
                        <button
                            onClick={() => {
                                openModal();
                                setModalImg(c.images.large)
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
                <PokemonCardModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    preventScroll={true}
                    closeTimeoutMS={500}
                >
                    <Image
                        src={modalImg}
                        alt={''}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: 'auto' }}
                    />
                </PokemonCardModal>
            </PokemonCardList>
        </Section>
    )
}

export default Cards