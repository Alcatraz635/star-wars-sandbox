import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './app/index';
import defaults from './store/defaults';
import resolvers from './store/resolvers';
import typeDefs from './store/type-defs';

import './styles/index.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
