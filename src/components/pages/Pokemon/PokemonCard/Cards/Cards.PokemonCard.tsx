import { Bold, H3, Small, Subtitle } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { ICard } from '@/types/Cards/Card';
import Image from 'next/image';
import { useState } from 'react';
import { PokemonCardList, PokemonCardModal, PokemonCardInfo } from './Styled.Cards.PokemonCard';

type Props = {
    cards: ICard[];
}

function Cards({ cards }: Props) {

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ICard | null>(null);
    const [flip, setFlip] = useState<boolean>(false)

    const openModal = () => {
        setFlip(false);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const getOccurence = (arr, value) => {
        return arr.filter(v => v === value).length
    }

    return (
        <Section>
            <H3>Cards</H3>
            <Small>Click on a card to zoom</Small>
            <PokemonCardList>
                {cards.map(c =>
                    <li>
                        <button
                            onClick={() => {
                                openModal();
                                setModalData(c)
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
                        <button
                            onClick={() => setFlip(!flip)}
                        >
                            {flip ? (
                                <PokemonCardInfo>
                                    <H3>{modalData.name}</H3>
                                    <Subtitle>{modalData.set.name}</Subtitle>
                                    <p>
                                        {modalData.subtypes[0]}
                                        {modalData.evolvesFrom && (
                                            `Evolves from: ${modalData.evolvesFrom}`
                                        )}
                                    </p>
                                    <p>{modalData.hp} Hp</p>
                                    <p>
                                        {modalData.types.map(t => (
                                            <span>{t}</span>
                                        ))}
                                    </p>
                                    <ul>
                                        {modalData?.abilities?.map(a => (
                                            <li>
                                                <p>
                                                    {a.type} <Bold>{a.name}</Bold>
                                                </p>
                                                <p>{a.text}</p>
                                            </li>
                                        ))}
                                        {modalData.attacks.map(a => (
                                            <li>
                                                <p>
                                                    {getOccurence(a.cost, a.cost.map(c => c))}
                                                    <Bold>{a.name}</Bold>
                                                    {a.damage}
                                                </p>
                                                {a.text &&
                                                    <p>
                                                        {a.text}
                                                    </p>
                                                }
                                            </li>
                                        ))}
                                    </ul>

                                </PokemonCardInfo>
                            ) : (
                                <Image
                                    src={modalData?.images.large}
                                    alt={''}
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            )}
                        </button>
                    </PokemonCardModal>
                )}
            </PokemonCardList>
        </Section>
    )
}

export default Cards