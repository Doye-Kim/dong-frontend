import React, {useCallback, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigator from './src/navigations/root/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from "react-native-splash-screen";

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // 백그라운드이거나 앱 껐을 때 메세지 받는 거
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // 토큰 받는 코드
  const getFcmToken = useCallback(async () => {
    const fcmToken = await messaging().getToken();
    // Alert.alert(fcmToken);
    console.log('fcm', fcmToken);
    // await dispatch(actions.requestNotification(fcmToken));
  }, []);

  // 앱 켜놨을 때 알림 받는 코드
  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, [getFcmToken]);

  useEffect(() => {
    SplashScreen.hide()
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  });

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
