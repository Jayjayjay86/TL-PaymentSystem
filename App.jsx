import './gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import AccountScreen from './src/components/AccountScreen';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <GestureHandlerRootView>
      <View>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AccountScreen />
      </View>
    </GestureHandlerRootView>
  );
}

export default App;
