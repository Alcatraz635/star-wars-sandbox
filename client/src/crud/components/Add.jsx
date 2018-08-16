// @flow
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { AutoSuggestBox, ProgressRing } from 'react-uwp';
import { toast } from 'react-toastify';

type State = {
  suggestions: Array<Object>,
  isSubmitting: boolean,
}

const SUGGEST_CHARACTERS = gql`
    query SuggestCharacters($input: String!) {
        characters: suggest(input: $input, type: "people") {
            ... on Character {
                name
                height
                mass
                hairColor
                eyeColor
                birthYear
                image
                films
                __typename
            }
            ... on Starship {
                name
                __typename
            }
        }
    }
`;

const INSERT_CHARACTER = gql`
    mutation InsertCharacter($input: CharacterInput!) {
        insertCharacter(input: $input) {
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
`;

const GET_ALL_CHARACTERS = gql`
    query Characters {
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
`;

export default class Add extends PureComponent<{}, State> {
  state = {
    suggestions: [],
    isSubmitting: false,
  };

  renderSuggestions = (client: Object, suggestions: any) => suggestions.map(suggestion => (
    <div
      className={classNames('d-flex')}
      value={suggestion.name}
      onClick={() => this.handleInsertCharacter(client, suggestion)}
    >
      {suggestion.name}
    </div>
  ));

  renderIsPending = () => (
    <div className={classNames('d-flex', 'justify-content-center')}>
      <ProgressRing size={25} />
    </div>
  );

  handleInsertCharacter = async (client: Object, character: Object) => {
    const {
      name,
      height,
      mass,
      hairColor,
      eyeColor,
      birthYear,
      image,
    } = character;
    await this.setState({ isSubmitting: true });
    try {
      const res = await client.mutate({
        mutation: INSERT_CHARACTER,
        variables: {
          input: {
            name,
            height,
            mass,
            hairColor,
            eyeColor,
            birthYear,
            image,
          },
        },
        refetchQueries: [{ query: GET_ALL_CHARACTERS }],
        // awaitRefetchQueries: true,
      });
      client.writeData({ data: { dialogIsVisible: false } });
      toast(`${res.data.insertCharacter.name} was added.`);
    } catch (err) {
      toast(err.message);
    }
    await this.setState({ isSubmitting: false });
  };

  handleChangeValue = async (client: Object, input: String) => {
    try {
      await this.setState({ suggestions: [this.renderIsPending()] });
      const { data } = await client.query({
        query: SUGGEST_CHARACTERS,
        variables: { input },
      });
      if (data) {
        const { characters } = data;
        const suggestions = await this.renderSuggestions(client, characters);
        await this.setState({ suggestions });
      } else {
        await this.setState({ suggestions: [] });
      }
    } catch (err) {
      toast(err.message);
    }
  };

  debouncedHandleChangeValue = debounce(this.handleChangeValue, 350); // eslint-disable-line

  render() {
    const { suggestions, isSubmitting } = this.state;
    return (
      <ApolloConsumer>
        {client => (isSubmitting
            ? <ProgressRing size={75} />
            : (
              <div>
                <h4>
                  Add Character
                </h4>
                <AutoSuggestBox
                  placeholder="Search..."
                  listSource={suggestions}
                  onChangeValue={input => this.debouncedHandleChangeValue(client, input)}
                />
              </div>
            )
        )}
      </ApolloConsumer>
    );
  }
}
