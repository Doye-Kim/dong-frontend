import React, {useEffect, useState} from 'react';
import Navbar from '../tab/Navbar';
import useUserStore from '../../store/useUserStore';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import PinCodeScreen from '@/screen/auth/PinCodeScreen';
import FcmAlert from '@/components/common/FcmAlert';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import messaging from '@react-native-firebase/messaging';

function RootNavigator() {
  const isLogin = useUserStore(state => state.isLogin);
  const [initialRoute, setInitialRoute] = useState<'AuthHome' | 'PinCode'>(
    'AuthHome',
  );
  const [fcmData, setFcmData] = useState<{title?: string; body?: string}>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  useEffect(() => {
    const checkUserData = async () => {
      const userData = await getEncryptStorage('user');
      setInitialRoute(userData ? 'PinCode' : 'AuthHome');
    };

    checkUserData();
  }, []);

  // FCM 포그라운드 메시지 처리
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        // console.log(remoteMessage.notification);
        const {title, body} = remoteMessage.notification;
        setFcmData({title, body});
        setIsOpenAlert(true);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {isLogin ? (
        <>
          <Navbar />
          {isOpenAlert && fcmData.title && fcmData.body && (
            <FcmAlert
              title={fcmData.title}
              body={fcmData.body}
              onClose={() => setIsOpenAlert(false)}
            />
          )}
        </>
      ) : initialRoute === 'PinCode' ? (
        <PinCodeScreen
          route={{params: {pageNumber: 3}}}
          navigation={undefined}
        />
      ) : (
        <AuthStackNavigator initialRoute={initialRoute} />
      )}
    </>
  );
}

export default RootNavigator;
