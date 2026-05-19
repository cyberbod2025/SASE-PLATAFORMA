import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App scaffold', () => {
  it('renders the institutional shell and a controlled placeholder', () => {
    render(
      <MemoryRouter initialEntries={['/direccion']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Plataforma institucional escolar' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dirección' })).toBeInTheDocument();
    expect(screen.getByText('En preparación')).toBeInTheDocument();
  });
});
