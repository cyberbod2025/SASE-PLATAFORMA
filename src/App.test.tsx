import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';

vi.mock('./repositories/studentsRepository', () => ({
  studentsRepository: {
    getAll: vi.fn().mockResolvedValue([
      {
        id: 'a1',
        matricula: 'A001',
        nombre: 'Ana Pérez',
        estado: 'activo',
        grupo: '2A',
        tutor: 'Tutor Ana',
      },
    ]),
    getById: vi.fn().mockResolvedValue({
      id: 'a1',
      matricula: 'A001',
      nombre: 'Ana Pérez',
      estado: 'activo',
      grupo: '2A',
      tutor: 'Tutor Ana',
    }),
  },
}));

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
