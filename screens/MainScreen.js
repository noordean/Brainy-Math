import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { Constants } from 'expo';

import Label from '../components/Label';
import ButtonElement from '../components/ButtonElement';
import Options from '../components/Options';
import icon from  '../assets/icons/math.png';
import startAction from '../actions/startAction';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
      optionList: ['A', 'B', 'C', 'D']
    }
    this.startGame = this.startGame.bind(this);
  }
  static navigationOptions = {
    title: 'BrainyMath',
    headerStyle: {
      height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
      backgroundColor: '#2196F3'
    },
    headerTitleStyle: {
      marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
      color: 'white'
    },
    headerLeft: (
      <Image
        source={icon}
        style= {{
          marginTop: 20,
          marginLeft: 20,
          height: 40,
          width: 40
        }}
      />
    )
  };
  startGame() {
    this.props.startGame();
  }
  render() {
    return (
      <View style={styles.container}>
        <Label
          labelText={this.props.operands === undefined ? 0 : this.props.operands[0]}
          style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
        />
        <Label
          labelText={'+'}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <Label
          labelText={this.props.operands === undefined ? 0 : this.props.operands[1]}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <ButtonElement
          buttonText={'Start'}
          onPress={this.startGame}
        />
        <Options
          selectedIndex={this.state.selectedIndex}
          optionList={this.state.optionList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

const mapStateToProps = state => ({
  operands: state.operands
});

const matchDispatchToProps = dispatch => bindActionCreators({
  startGame: startAction
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MainScreen);