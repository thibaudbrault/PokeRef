import React from 'react'
import { Items } from '@/types/types'
import { ItemCardDataCost } from '../Styled.ItemCard';

type Props = {
    item?: Items.Items;
}

function CostItemCard({ item }: Props) {
    return (
        <>
            {item?.cost !== 0 && (
                <ItemCardDataCost>
                    <span>Cost :</span> {item?.cost} Pokédollars
                </ItemCardDataCost>
            )}
        </>
    )
}

export default CostItemCard