import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import MainScreen from './screens/MainScreen';
import store from './store';

export default class App extends Component {
  render() {
    const MainNavigator = StackNavigator({
      Main: { screen: MainScreen }
    });
    
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
