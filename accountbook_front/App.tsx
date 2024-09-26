// import {StyleSheet, useColorScheme} from 'react-native';
import Toast from 'react-native-toast-message';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigator from './src/navigations/root/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  return (
    <>
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
    </>
  );
};

// const styles = StyleSheet.create({});

export default App;
