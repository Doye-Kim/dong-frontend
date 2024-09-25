import useUserStore from '@/store/useUserStore';
import Navbar from '@/navigations/stack/Navbar';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import {useEffect, useState} from 'react';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import PinCodeScreen from '@/screen/auth/PinCodeScreen';

function RootNavigator() {
  const isLogin = useUserStore(state => state.isLogin);
  console.log(isLogin);
  const [initialRoute, setInitialRoute] = useState<'AuthHome' | 'PinCode'>(
    'AuthHome',
  );

  useEffect(() => {
    const checkUserData = async () => {
      const userData = await getEncryptStorage('user');
      console.log('user', userData);
      if (userData) {
        console.log('pin');
        setInitialRoute('PinCode'); // 페이지 넘길 값을 결정
      } else {
        console.log('AuthHome');
        setInitialRoute('AuthHome');
      }
    };

    checkUserData();
  }, []);

  return (
    <>
      {isLogin ? (
        <Navbar />
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
