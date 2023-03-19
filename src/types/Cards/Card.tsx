export interface ICard {
    artist: string;
    attacks: ICardAttacks[];
    cardmarket: ICardMarket;
    evolvesTo: string[];
    flavorText?: string;
    hp: string;
    id: string;
    images: ICardImages;
    legalities: ICardLegalities;
    level?: string;
    name: string;
    nationalPokedexNumbers: number[];
    number: string;
    rarity: string;
    regulationMark?: string;
    resistances?: ICardResistances[];
    retreatCost: string[];
    set: ICardSet;
    subtypes: string[];
    supertype: string;
    tcgplayer: ICardMarket;
    types: string[];
    weakness?: ICardWeakness[];
}

export interface ICardAttacks {
    convertedEnergyCost: number;
    cost: string[];
    damage: string;
    name: string;
    text: string;
}

export interface ICardMarket {
    url: string;
    updatedAt: string;
    prices: ICardMarketPrices;
}

export interface ICardMarketPrices {

}

export interface ICardLegalities {
    standard?: string;
    expanded?: string;
    unlimited?: string
}

export interface ICardImages {
    small: string;
    large: string;
}

export interface ICardResistances {
    type: string;
    value: string;
}

export interface ICardSet {
    id: string;
    images: ICardSetImages;
    legalities: ICardLegalities;
    name: string;
    printedTotal: number;
    ptcgoCode?: string;
    releaseDate: string;
    series: string;
    total: number;
    updatetdAt: string;
}

export interface ICardSetImages {
    symbol: string;
    logo: string;
}

export interface ICardWeakness {
    type: string;
    value: string;
}