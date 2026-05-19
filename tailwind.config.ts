import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        institution: {
          ink: '#172033',
          blue: '#1e3a8a',
          cyan: '#0891b2',
          green: '#14735f',
          amber: '#b7791f',
          violet: '#6d28d9',
          paper: '#f7f8fb'
        }
      },
      boxShadow: {
        panel: '0 1px 2px rgba(23, 32, 51, 0.08)',
        luminous: '0 16px 36px rgba(30, 64, 175, 0.14)'
      }
    }
  }
} satisfies Config;
