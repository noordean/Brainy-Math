import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';


const Label = props => (
  <View style={props.style}>
    <Text h3>{props.labelText}</Text>
  </View>
);

export default Label;
