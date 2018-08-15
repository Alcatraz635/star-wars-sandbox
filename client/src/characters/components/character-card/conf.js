import sample from 'lodash.sample';

import HeaderOne from '../../../images/atat.jpg';
import HeaderTwo from '../../../images/city.jpg';
import HeaderThree from '../../../images/forest.jpg';
import HeaderFour from '../../../images/trooper.jpg';
import HeaderFive from '../../../images/trooper-2.jpg';

export const randomHeader = () => sample([
  HeaderOne,
  HeaderTwo,
  HeaderThree,
  HeaderFour,
  HeaderFive,
]);

export const formatStats = character => [
  { name: 'Height', value: character.height },
  { name: 'Mass', value: character.mass },
  { name: 'Hair Color', value: character.hairColor },
  { name: 'Eye Color', value: character.eyeColor },
  { name: 'Birth Year', value: character.birthYear },
];
