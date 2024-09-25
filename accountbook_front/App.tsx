// import {StyleSheet, useColorScheme} from 'react-native';
import Toast from 'react-native-toast-message';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigator from './src/navigations/root/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
};

// const styles = StyleSheet.create({});

export default App;
