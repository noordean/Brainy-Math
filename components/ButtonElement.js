import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';


const ButtonElement = props => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Button
      title={props.buttonText}
      onPress={props.onPress}
    />
  </View>
);

export default ButtonElement;
