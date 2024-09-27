import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthHomeScreen from '@/screen/auth/AuthHomeScreen';
import PinCodeScreen from '@/screen/auth/PinCodeScreen';
import JoinScreen from '@/screen/auth/JoinScreen';
import SelectAssetsScreen from '@/screen/auth/SelectAssetsScreen';
import {authNavigations, colors} from '@/constants';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.JOIN]: undefined;
  [authNavigations.PIN]: {pageNumber: number};
  [authNavigations.SELECT_ASSETS]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator({
  initialRoute,
}: {
  initialRoute: 'AuthHome' | 'PinCode';
}) {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
        headerStyle: {
          shadowColor: 'transparent',
          backgroundColor: colors.WHITE,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Pretendard-Bold',
          paddingLeft: 0,
          marginLeft: 0,
        },
        headerTintColor: colors.BLACK,
      }}>
      {initialRoute === 'AuthHome' ? (
        <>
          <Stack.Screen
            name={authNavigations.AUTH_HOME}
            component={AuthHomeScreen}
            options={{
              headerTitle: ' ',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={authNavigations.JOIN}
            component={JoinScreen}
            options={{
              headerTitle: '회원가입',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={authNavigations.PIN}
            component={PinCodeScreen}
            initialParams={{pageNumber: 1}}
            options={{
              headerTitle: ' ',
            }}
          />
          <Stack.Screen
            name={authNavigations.SELECT_ASSETS}
            component={SelectAssetsScreen}
            options={{
              headerTitle: ' ',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={authNavigations.PIN}
            component={PinCodeScreen}
            initialParams={{pageNumber: 3}}
            options={{
              headerTitle: ' ',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
