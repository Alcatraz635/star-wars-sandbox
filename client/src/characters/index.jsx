// @flow
import React from 'react';
import { pure } from 'recompose';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import classNames from 'classnames';
import { ProgressRing } from 'react-uwp';
import { toast } from 'react-toastify';
import {
  CSSGrid, measureItems, makeResponsive, layout,
} from 'react-stonecutter';
import Div100vh from 'react-div-100vh';

import CharacterCard from './components/character-card';

const Grid = makeResponsive(measureItems(CSSGrid), {
  maxWidth: 1920,
  minPadding: 100,
});

export default pure(() => (
  <Query
    query={gql`
      {
        characters: allCharacters {
          _id
          name
          height
          mass
          hairColor
          eyeColor
          birthYear
          image
        }
      }
    `}
  >
    {({ loading, error, data }: Object) => {
      if (loading) {
        return <ProgressRing size={50} />;
      }
      if (error) {
        toast(error.message);
      }

      return (
        <Div100vh className={classNames('grid-wrapper')}>
          <Grid
            component="ul"
            columns={5}
            columnWidth={350}
            gutterWidth={5}
            gutterHeight={5}
            layout={layout.pinterest}
            duration={800}
            easing="ease-out"
          >
            {data ? data.characters.map(character => (
              <li
                key={character._id}
                itemHeight={350}
              >
                <CharacterCard character={character} />
              </li>
            ))
              : null}
          </Grid>
        </Div100vh>
      );
    }}
  </Query>
));
