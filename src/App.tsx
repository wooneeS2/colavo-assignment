import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from 'routePage';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'design/theme';
import GlobalStyle from 'design/globalStyle';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <RoutePage />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
