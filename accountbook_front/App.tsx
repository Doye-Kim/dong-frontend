// import {StyleSheet, useColorScheme} from 'react-native';
import Toast from 'react-native-toast-message';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigator from './src/navigations/root/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  // fcm 백그라운드 메시지 처리
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // getFcmToken은 회원가입 시에만 필요하나 백엔드 테스트용으로 주석처리해서 둠
  // #todo 추후 삭제할 것
  // const getFcmToken = useCallback(async () => {
  //   const data = await messaging().getToken();
  //   console.log('fcm', data);
  //   return data;
  // }, []);

  // fcm 포그라운드 메시지 처리
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
      );
      Toast.show({
        type: 'success',
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body,
      });
    });
    // 메시지 리스너 해제
    return unsubscribe;
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

// const styles = StyleSheet.create({});

export default App;
