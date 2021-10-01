import { createTheme } from '@mui/material/styles';

const paletteDark = {
  primary: { main: '#FF9100', dark: '#FF6D00' },
  secondary: { main: '#FF3D00', contrastText: '#FAFAFA' },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...paletteDark
  },
});