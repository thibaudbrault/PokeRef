import Header from '../../components/layout/Header/Header';
import { fireEvent, render, screen } from '@testing-library/react';

test(`Renders the title`, () => {
  render(<Header />);
  const title = screen.getByText(/pokéref/i);
  expect(title).toBeInTheDocument();
});

test(`Theme button is different according to the state`, () => {
  render(<Header />);
  const button = screen.getByTestId(`themeBtn`);
  const moon = screen.getByTestId(`moon`);
  expect(moon).toBeVisible();
  fireEvent.click(button);
  expect(moon).not.toBeVisible();
  // const sun = screen.getByTestId("sun")
  // expect(sun).toBeVisible()
});
