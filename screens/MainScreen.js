import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { StyleSheet, View, Platform, Image, Alert, Dimensions } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import ButtonElement from '../components/ButtonElement';
import Options from '../components/Options';
import icon from  '../assets/icons/math.png';
import generateOperands from '../actions/generateOperands';
import generateOptions from '../actions/generateOptions';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const SCREEN_WIDTH = Dimensions.get('window').width;

let playTimerId = null;
let runTimerId = null;
/**
  * @class MainScreen
  */
class MainScreen extends Component {
/**
  * @constructor
  * @param {Object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      options: [0, 0, 0, 0],
      operands: [0, 0],
      questionCount: 0,
      totalQuestion: 10,
      score: 0,
      time: 5,
      gameOver: true
    }
    this.playGame = this.playGame.bind(this);
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
          height: 45,
          width: 45
        }}
      />
    )
  };

  /**
  * description: executes when the state changes
  *
  * @param {Object} nextProps the next state
  *
  * @return {Void} void
  */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        operands: nextProps.operands,
        options: this.shuffleOptions(nextProps.options)
      });
    }
  }

  /**
  * description: calls the generateOptions action
  * creator
  *
  * @return {Void} void
  */
  getOptions() {
    const answer = this.state.operands[0] + this.state.operands[1];
    this.props.generateOptions(answer);
  }

  /**
  * description: shuffles the options from from props
  *
  * @param {Array} options array of options from props
  *
  * @return {Array} sorted options
  */
  shuffleOptions(options) {
    return options.sort(() => Math.random() - 0.5);
  }

  /**
  * description: gets operands and options ready for 
  * a round of game 
  *
  * @return {Void} void
  */
  startGame() {
    this.props.generateOperands();
    setTimeout(() => {
      this.getOptions();
    }, 0);
  }

  /**
  * description: resets state to initil values
  *
  * @return {Void} void
  */
  resetGame() {
    this.setState({
      selectedIndex: 1,
      options: [0, 0, 0, 0],
      operands: [0, 0],
      questionCount: 0,
      score: 0,
      time: 5,
      gameOver: true
    });
    clearInterval(playTimerId);
    clearInterval(runTimerId);
  }

  /**
  * description: gets called when an option is clicked
  *
  * @param {Number} selectedIndex: index of the button clicked
  * in the ButtonGroup element
  * 
  * @return {Void} void
  */
  chooseAnswer(selectedIndex) {
    const {
      options,
      operands,
      totalQuestion,
      gameOver,
      questionCount,
      score
    } = this.state;
    if (gameOver === false && questionCount === totalQuestion) {
      this.resetGame();
      return Alert.alert('Game Over',
      `Score: ${Math.floor((score + 1)/totalQuestion * 100)}%`);
    }
    if (options[selectedIndex] === operands[0] + operands[1]) {
      this.setState({
        score: score + 1
      });
    }
    this.startGame();
    this.setState({
      questionCount: questionCount + 1,
      time: 5
    });
  }

  /**
  * description: executes when the state is about
  * to get updated
  *
  * @return {Void} void
  */
  componentWillUpdate() {
    const { questionCount, totalQuestion, time, score } = this.state;
    if (questionCount === (totalQuestion + 1) && time === 0) {
      this.resetGame();
      Alert.alert('Game Over',
      `Score: ${Math.floor((score + 1)/totalQuestion * 100)}%`);
    }
  }

  /**
  * description: start game process by calling timer,
  * startGame and increment question number
  *
  * @return {Void} void
  */
  playGame() {
    this.runTimer()
    this.startGame();
    this.setState({
      gameOver: false,
      questionCount: 1
    });
    playTimerId = setInterval(() => {
      if (this.state.time === 0 && this.state.gameOver === false) {
        this.startGame();
        this.setState({
          questionCount: this.state.questionCount + 1
        });
      }
    }, 1000);
  }

  /**
  * description: runs timer
  *
  * @return {Void} void
  */
  runTimer() {
    runTimerId = setInterval(() => {
      if (this.state.gameOver === false) {
        if (this.state.time === 0) {
          this.setState({
            time: 5
          });
        } else {
          this.setState({
            time: this.state.time - 1
          });
        }
      }
    }, 1000);
  }

  /**
  * description: renders start button only if
  * game is not in progress
  *
  * @return {Object} Start button component
  */
  renderStartBtn() {
    if (this.state.gameOver) {
      return (<ButtonElement
                buttonText={'Start'}
                onPress={this.playGame}
              />);
    }
    return null;
  }

  /**
  * description: renders Options ButtonGroup
  * only if game is in progress
  *
  * @return {Object} component
  */
  renderOptionBtns() {
    if (!this.state.gameOver) {
      return (<Options
                selectedIndex={this.state.selectedIndex}
                optionList={this.state.options}
                onPress={this.chooseAnswer}
              />);
    }
    return null;
  }

  /**
  * description: renders the component
  *
  * @return {Object} MainScreen component
  */
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
          <Text h6>Question: {this.state.questionCount}</Text>
          <Text h6>Timer: {this.state.time}s</Text>
          <Text h6>Score: {this.state.score}</Text>
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
          {this.renderStartBtn()}
          {this.renderOptionBtns()}
        </View>
      </View>

    );
  }
}

MainScreen.propTypes = {
  generateOperands: PropTypes.func.isRequired,
  generateOptions: PropTypes.func.isRequired,
  operands: PropTypes.arrayOf(PropTypes.number).isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const mapStateToProps = state => ({
  operands: state.operands,
  options: state.options
});

const matchDispatchToProps = dispatch => bindActionCreators({
  generateOperands,
  generateOptions
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MainScreen);