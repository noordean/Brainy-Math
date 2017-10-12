import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const ButtonElement = props => (
  <View>
    <Button
      title={props.buttonText}
      onPress={props.onPress}
    />
  </View>
);

ButtonElement.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ButtonElement;
