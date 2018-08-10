// @flow
import React from 'react';
import Div100vh from 'react-div-100vh';
import {
  NavigationView, Theme as UWPThemeProvider, getTheme,
} from 'react-uwp';

import theme from './styles/theme';
import desktopBackgroundImage from './images/background.jpg';

// $FlowFixMe
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <UWPThemeProvider
    theme={getTheme({
      themeName: theme.themeName,
      accent: theme.accent,
      useFluentDesign: true,
      desktopBackgroundImage,
    })}
  >
    <Div100vh>
      <NavigationView
        pageTitle="Star Wars"
        displayMode="compact"
        autoResize={false}
        initWidth={48}
        expandedWidth={120}
      />
    </Div100vh>
  </UWPThemeProvider>
);

export default App;
