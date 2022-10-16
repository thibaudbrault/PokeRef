import React from 'react'
import { render } from '@testing-library/react'
import Pokemon from '../../pages/index'
import '@testing-library/jest-dom'
import { TestQueryProvider } from '../helpers/test-utils'

test('Renders the Pokemon page', () => {
    render(<Pokemon />, { wrapper: TestQueryProvider });

    const { getByText } = render(<Pokemon />, { wrapper: TestQueryProvider });
    expect(getByText('Form')).toBeInTheDocument();
})