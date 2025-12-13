'use client';

import React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
    h1: {
      fontFamily: 'var(--font-mula-display), Inter, sans-serif',
      fontWeight: 900,
    },
    h2: {
      fontFamily: 'var(--font-mula-display), Inter, sans-serif',
      fontWeight: 900,
    },
    h3: {
      fontFamily: 'var(--font-mula-display), Inter, sans-serif',
      fontWeight: 900,
    },
    h4: {
      fontFamily: 'var(--font-mula-display), Inter, sans-serif',
      fontWeight: 900,
    },
    h5: {
      fontFamily: 'var(--font-mula-display), Inter, sans-serif',
      fontWeight: 900,
    },
    h6: {
      fontFamily: 'var(--font-mula-display), Inter, sans-serif',
      fontWeight: 900,
    },
  },
  palette: {
    primary: {
      main: '#E00000', // MULA Red
      dark: '#B00000',
      light: '#FF3333',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#009000', // MULA Green
      dark: '#007000',
      light: '#00B000',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E00000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F9FAFB',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover fieldset': {
              borderColor: '#E00000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E00000',
            },
          },
          '& .MuiFilledInput-root': {
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgba(224, 0, 0, 0.04)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(224, 0, 0, 0.08)',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#E00000',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#E00000',
          '&.Mui-checked': {
            color: '#E00000',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#E00000',
          '&.Mui-checked': {
            color: '#E00000',
          },
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

