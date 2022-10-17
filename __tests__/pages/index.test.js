import React from 'react'
import { render } from '@testing-library/react'
import Pokemon from '../../pages/index'
import '@testing-library/jest-dom'
import { TestQueryProvider } from '../helpers/test-utils'

describe('Pokemon component', () => {
    test('It renders', () => {
        render(<Pokemon />, { wrapper: TestQueryProvider });
    });
    test('It has Form inside', async () => {
        const { findByText } = render(<Pokemon />, { wrapper: TestQueryProvider });
        const formText = await findByText('Form');
        expect(formText).toBeInTheDocument();
    })
})