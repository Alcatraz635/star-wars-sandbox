// @flow
import React from 'react';
import { pure } from 'recompose';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Dialog } from 'react-uwp';
import CloseOnEscape from 'react-close-on-escape';

import Add from './components/Add';
import Edit from './components/Edit';

const GET_DIALOG_IS_VISIBLE = gql`
    {
        dialogIsVisible @client
        crudAction @client
    }
`;

const dialogContent = action => {
  switch (action) {
    case 'add':
      return <Add />;
    case 'edit':
      return <Edit />;
    default:
      return null;
  }
};

export default pure(() => (
  <Query query={GET_DIALOG_IS_VISIBLE}>
    {({ data, client }: Object) => (data.dialogIsVisible
        && (
          <CloseOnEscape onEscape={() => client.writeData({ data: { dialogIsVisible: false } })}>
            <Dialog
              defaultShow={data.dialogIsVisible}
              onCloseDialog={() => client.writeData({ data: { dialogIsVisible: false } })}
            >
              {dialogContent(data.crudAction)}
            </Dialog>
          </CloseOnEscape>
        )
    )}
  </Query>
));
