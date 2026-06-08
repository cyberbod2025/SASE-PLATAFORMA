import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(screen.getByRole('button', { name: 'Notificaciones en preparación' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'SOS institucional en preparación' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Sasito en preparación' })).toBeDisabled();
  });

  it('identifies incident creation as a local non-persistent draft', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/alumnos/a1']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: 'Ana Pérez' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Preparar incidencia local' }));

    const saveButton = screen.getByRole('button', { name: 'Guardar borrador local' });
    expect(saveButton).toBeDisabled();

    await user.type(screen.getByLabelText('Descripción'), 'Incidencia de prueba local.');
    expect(saveButton).toBeEnabled();
    await user.click(saveButton);

    expect(
      screen.getByText('Borrador guardado solo en esta sesión. No se persistió ni notificó institucionalmente.')
    ).toBeInTheDocument();
  });
});
