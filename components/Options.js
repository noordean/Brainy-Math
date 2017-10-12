import React from 'react';
import { View, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Options = props => (
  <View>
    <ButtonGroup
      onPress={props.onPress}
      selectedIndex={props.selectedIndex}
      buttons={props.optionList}
      containerStyle={{ height: 40, width: SCREEN_WIDTH * 0.9 }}
      buttonStyle={{ backgroundColor: 'white' }}
      selectedTextStyle={{ color: 'orange', fontWeight: '900' }}
    />
  </View>
);

Options.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  optionList: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPress: PropTypes.func.isRequired
};
export default Options;

