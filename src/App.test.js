import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Deck Of Cards heading', () => {
  render(<App />);
  const heading = screen.getByText(/Deck Of Cards/i);
  expect(heading).toBeInTheDocument();
});
