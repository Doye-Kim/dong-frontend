import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigations/root/RootNavigator';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {colors} from '@/constants';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.WHITE,
  },
};

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  // getFcmToken은 회원가입 시에만 필요하나 백엔드 테스트용으로 주석처리해서 둠
  // #todo 추후 삭제할 것
  // const getFcmToken = useCallback(async () => {
  //   const data = await messaging().getToken();
  //   console.log('fcm', data);
  //   return data;
  // }, []);

  return (
    <PaperProvider>
      <NavigationContainer theme={MyTheme}>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
};

// const styles = StyleSheet.create({});

export default App;
