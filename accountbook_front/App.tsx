import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigations/root/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import useThemeStore from './src/store/useThemeStore';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  // dark | light
  const {setTheme} = useThemeStore();
  const theme = useColorScheme();

  useEffect(() => {
    setTheme(theme === 'dark' ? 'dark' : 'light');
  }, []);

  // getFcmToken은 회원가입 시에만 필요하나 백엔드 테스트용으로 주석처리해서 둠
  // #todo 추후 삭제할 것
  // const getFcmToken = useCallback(async () => {
  //   const data = await messaging().getToken();
  //   console.log('fcm', data);
  //   return data;
  // }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
};

export default App;
