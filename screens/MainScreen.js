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

let playTimerId = null;
let runTimerId = null;
class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      options: ['A', 'B', 'C', 'D'],
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

  resetGame() {
    this.setState({
      selectedIndex: 1,
      options: ['A', 'B', 'C', 'D'],
      operands: [0, 0],
      questionCount: 0,
      score: 0,
      time: 5,
      gameOver: true
    });
    clearInterval(playTimerId);
    clearInterval(runTimerId);
  }

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
      return Alert.alert('Game Over', `Score: ${Math.floor((score + 1)/totalQuestion * 100)}%`);
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

  componentWillUpdate() {
    const { questionCount, totalQuestion, time, score } = this.state;
    if (questionCount === (totalQuestion + 1) && time === 0) {
      this.resetGame();
      Alert.alert('Game Over', `Score: ${Math.floor((score + 1)/totalQuestion * 100)}%`);
    }
  }
  
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

  renderStartBtn() {
    if (this.state.gameOver) {
      return (<ButtonElement
                buttonText={'Start'}
                onPress={this.playGame}
              />);
    }
    return null;
  }

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