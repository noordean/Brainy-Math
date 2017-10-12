import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import MainScreen from './screens/MainScreen';
import store from './store';

const App = () => {
  const MainNavigator = StackNavigator({
    Main: { screen: MainScreen }
  });
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
