// @flow
import React from 'react';
import Div100vh from 'react-div-100vh';
import {
  NavigationView, Theme as UWPThemeProvider, SplitViewCommand, getTheme,
} from 'react-uwp';
import { ToastContainer } from 'react-toastify';
import { ApolloConsumer } from 'react-apollo';

import Characters from '../characters';
import Crud from '../crud';
import theme from '../styles/theme';
import desktopBackgroundImage from '../images/background.jpg';
// $FlowFixMe
import 'react-toastify/dist/ReactToastify.min.css';
// $FlowFixMe
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Index = () => (
  <ApolloConsumer>
    {client => (
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
            navigationTopNodes={[
              <SplitViewCommand
                label="Add"
                icon="Add"
                onClick={() => client.writeData({
                  data: {
                    dialogIsVisible: true,
                    crudAction: 'add',
                  },
                })}
              />,
            ]}
          >
            <Characters />
          </NavigationView>
          <ToastContainer
            toastClassName="dark-toast"
            position="bottom-right"
          />
          <Crud />
        </Div100vh>
      </UWPThemeProvider>
    )}
  </ApolloConsumer>
);

export default Index;
