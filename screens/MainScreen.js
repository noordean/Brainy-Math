import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { StyleSheet, View, Platform, Image, Alert, Dimensions } from 'react-native';
import { Constants } from 'expo';

import Label from '../components/Label';
import ButtonElement from '../components/ButtonElement';
import Options from '../components/Options';
import icon from  '../assets/icons/math.png';
import generateOperands from '../actions/generateOperands';
import generateOptions from '../actions/generateOptions';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const SCREEN_WIDTH = Dimensions.get('window').width;

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      options: ['A', 'B', 'C', 'D'],
      operands: [0, 0],
      questionCount: 0,
      score: 0
    }
    this.startGame = this.startGame.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        operands: nextProps.operands,
        options: this.shuffleOptions(nextProps.options)
      });
    }
  }
  
  getOptions() {
    const answer = this.state.operands[0] + this.state.operands[1];
    this.props.generateOptions(answer);
  }
  
  shuffleOptions(options) {
    return options.sort(() => Math.random() - 0.5);
  }
  startGame() {
    this.props.generateOperands();
    setTimeout(() => {
      this.getOptions();
    }, 0);
  }

  chooseAnswer(selectedIndex) {
    const options = this.state.options;
    const operands = this.state.operands;
    if (options[selectedIndex] === operands[0] + operands[1]) {
      Alert.alert('correct');
    } else {
      Alert.alert('not correct');
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginLeft: 10,
          width: SCREEN_WIDTH * 0.9 }}
        >
          <Text h6>Question: 1</Text>
          <Text h6>Timer: 0</Text>
          <Text h6>Score: 0</Text>
        </View>
        <View style={{
          flex: 6,
          justifyContent: 'space-between',
          alignItems: 'center'}}>
          <Label
            labelText={this.state.operands[0]}
          />
          <Label
            labelText={'+'}
          />
          <Label
            labelText={this.state.operands[1]}
          />
          <ButtonElement
            buttonText={'Start'}
            onPress={this.startGame}
          />
          <Options
            selectedIndex={this.state.selectedIndex}
            optionList={this.state.options}
            onPress={this.chooseAnswer}
          />
        </View>
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
  operands: state.operands,
  options: state.options
});

const matchDispatchToProps = dispatch => bindActionCreators({
  generateOperands,
  generateOptions
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MainScreen);