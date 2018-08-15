// @flow
import React from 'react';
import { pure } from 'recompose';
import { UserCard } from 'react-ui-cards';
import classNames from 'classnames';
import { ApolloConsumer } from 'react-apollo';

import { randomHeader, formatStats } from './conf';

export default pure(({ character }) => (
  <ApolloConsumer>
    {client => (
      <div
        onClick={() => {
          client.writeData({
            data: {
              dialogIsVisible: true,
              crudAction: 'edit',
              formData: JSON.stringify(character),
            },
          });
        }}
      >
        <UserCard
          cardClass={classNames('float', 'character-card')}
          header={randomHeader()}
          avatar={character.image}
          name={character.name}
          stats={formatStats(character)}
        />
      </div>
    )}
  </ApolloConsumer>
));
