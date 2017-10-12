import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

const Label = props => (
  <View>
    <Text h3>{props.labelText}</Text>
  </View>
);

Label.propTypes = {
  labelText: PropTypes.oneOfType([PropTypes.string,
    PropTypes.number]).isRequired
};

export default Label;
