// @flow
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, ProgressRing, TextBox,
} from 'react-uwp';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';

type State = {
  isDeleting: boolean,
}

const GET_CHARACTER_EDIT = gql`
    {
        formData @client
    }
`;

const EDIT_CHARACTER = gql`
    mutation EditCharacter($id: ID!, $input: CharacterInput!) {
        editCharacter(id: $id, input: $input) {
            name
        }
    }
`;

const REMOVE_CHARACTER = gql`
    mutation RemoveCharacter($id: ID!) {
        removeCharacter(id: $id) {
            name
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

export default class Edit extends PureComponent<{}, State> {
  state = {
    isDeleting: false,
  };

  handleEditCharacter = async (client: Object, character: Object) => {
    const {
      _id,
      name,
      height,
      mass,
      hairColor,
      eyeColor,
      birthYear,
      image,
    } = await character;
    try {
      const res = await client.mutate({
        mutation: EDIT_CHARACTER,
        variables: {
          id: _id,
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
        awaitRefetchQueries: true,
      });
      await client.writeData({ data: { dialogIsVisible: false } });
      toast(`${res.data.editCharacter.name} was updated.`);
    } catch (err) {
      toast(err.message);
    }
  };

  handleRemoveCharacter = async (client: Object, id: string) => {
    await this.setState({ isDeleting: true });
    try {
      const res = await client.mutate({
        mutation: REMOVE_CHARACTER,
        variables: { id },
        refetchQueries: [{ query: GET_ALL_CHARACTERS }],
        // awaitRefetchQueries: true,
      });
      await client.writeData({ data: { dialogIsVisible: false } });
      toast(`${res.data.removeCharacter.name} was deleted.`);
    } catch (err) {
      toast(err.message);
    }
    await this.setState({ isDeleting: true });
  };

  render() {
    const { isDeleting } = this.state;
    return (
      <Query query={GET_CHARACTER_EDIT}>
        {({
            loading, error, data, client,
          }: Object) => {
          if (loading) {
            return <ProgressRing size={50} />;
          }
          if (error) {
            toast(error.message);
          }
          return (
            <Formik
              initialValues={JSON.parse(data.formData)}
              onSubmit={values => this.handleEditCharacter(client, values)}
              render={({
                         values,
                         errors,
                         touched,
                         handleBlur,
                         handleChange,
                         handleSubmit,
                         isSubmitting,
                       }) => (
                <Form className={classNames('d-flex', 'flex-column')}>
                  <h4>
                    Edit Character
                  </h4>
                  <label
                    id="name-field-label"
                    htmlFor="name-field"
                    className={classNames('d-flex', 'align-items-center', 'justify-content-between')}
                  >
                    Name
                    <TextBox
                      id="name-field"
                      className={classNames('ml-1')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      type="text"
                      name="name"
                    />
                  </label>
                  {errors.name && touched.name && (
                    <div>
                      {errors.name}
                    </div>
                  )}
                  <label
                    id="height-field-label"
                    htmlFor="height-field"
                    className={classNames('d-flex', 'align-items-center', 'justify-content-between')}
                  >
                    Height
                    <TextBox
                      id="height-field"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.height}
                      type="text"
                      name="height"
                    />
                  </label>
                  {errors.height && touched.height && (
                    <div>
                      {errors.height}
                    </div>
                  )}
                  <label
                    id="mass-field-label"
                    htmlFor="mass-field"
                    className={classNames('d-flex', 'align-items-center', 'justify-content-between')}
                  >
                    Mass
                    <TextBox
                      id="mass-field"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mass}
                      type="text"
                      name="mass"
                    />
                  </label>
                  {errors.mass && touched.mass && (
                    <div>
                      {errors.mass}
                    </div>
                  )}
                  <label
                    id="hair-color-field-label"
                    htmlFor="hair-color-field"
                    className={classNames('d-flex', 'align-items-center', 'justify-content-between')}
                  >
                    Hair Color
                    <TextBox
                      id="hair-color-field"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hairColor}
                      type="text"
                      name="hairColor"
                    />
                  </label>
                  {errors.hairColor && touched.hairColor && (
                    <div>
                      {errors.hairColor}
                    </div>
                  )}
                  <label
                    id="eye-color-field-label"
                    htmlFor="eye-color-field"
                    className={classNames('d-flex', 'align-items-center', 'justify-content-between')}
                  >
                    Eye Color
                    <TextBox
                      id="eye-color"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.eyeColor}
                      type="text"
                      name="eyeColor"
                    />
                    {errors.eyeColor && touched.eyeColor && (
                      <div>
                        {errors.eyeColor}
                      </div>
                    )}
                  </label>
                  <label
                    id="birth-year-field-label"
                    htmlFor="birth-year-field"
                    className={classNames('d-flex', 'align-items-center', 'justify-content-between')}
                  >
                    Birth Year
                    <TextBox
                      id="birth-year-field"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.birthYear}
                      type="text"
                      name="birthYear"
                    />
                  </label>
                  {errors.birthYear && touched.birthYear && (
                    <div>
                      {errors.birthYear}
                    </div>
                  )}
                  <label
                    id="image-field-label"
                    htmlFor="image-field"
                    className={classNames('d-flex', 'align-items-center', 'justify-content-between')}
                  >
                    Image
                    <TextBox
                      id="image-field-label"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.image}
                      type="text"
                      name="image"
                    />
                  </label>
                  {errors.image && touched.image && (
                    <div>
                      {errors.image}
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting || isDeleting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? <ProgressRing size={25} /> : 'Submit'}
                  </Button>
                  <Button
                    className={classNames('mt-2')}
                    disabled={isSubmitting || isDeleting}
                    onClick={() => this.handleRemoveCharacter(client, values._id)}
                  >
                    {isDeleting ? <ProgressRing size={25} /> : 'Delete'}
                  </Button>
                </Form>
              )}
            />
          );
        }}
      </Query>
    );
  }
}
