import React from 'react'
import { render } from '@testing-library/react'
import Moves from '../../pages/moves'
import '@testing-library/jest-dom'
import { TestQueryProvider } from '../helpers/test-utils'

describe('Moves component', () => {
    test('Renders the Pokemon page', () => {
        render(<Moves />, { wrapper: TestQueryProvider });
    });

    test('Includes two buttons', async () => {
        const { findByText } = render(<Moves />, { wrapper: TestQueryProvider });
        const btnMoves = await findByText('Moves');
        const btnStatus = await findByText('Status');
        expect(btnMoves).toBeInTheDocument();
        expect(btnStatus).toBeInTheDocument();
    })
})