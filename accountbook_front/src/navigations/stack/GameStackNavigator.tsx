import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {gameNavigations, colors} from '@/constants';
import GameMainScreen from '@/screen/game/GameMainScreen';
import GameCreateScreen from '@/screen/game/GameCreateScreen';
import GameDetailScreen from '@/screen/game/GameDetailScreen';
import GameFriendsScreen from '@/screen/game/GameFriendsScreen';
import GamePrepareScreen from '@/screen/game/GamePrepareScreen';
import SelectAccountScreen from '@/screen/SelectAccountScreen';
import SelectCategoryScreen from '@/screen/game/SelectCategoryScreen';
import GameResultScreen from '@/screen/game/GameResultScreen';
import GameRequestScreen from '@/screen/game/GameRequestScreen';
import {Category} from '@/api/game';
import NotificationHeader from '@/components/common/NotificationHeader';
import NotificationScreen from '@/screen/NotificationScreen';
import {AccountInfo} from '@/api/asset';
import PinCodeScreen from '@/screen/auth/PinCodeScreen';
import useThemeStore from '@/store/useThemeStore';

export type GameStackParamList = {
  [gameNavigations.MAIN]: undefined;
  [gameNavigations.CREATE]: undefined;
  [gameNavigations.DETAIL]: {participantId: number};
  [gameNavigations.ACCOUNT]: {pageNumber: number};
  [gameNavigations.CATEGORY]: {category?: Category[]; participantId?: number};
  [gameNavigations.FRIENDS]: undefined;
  [gameNavigations.PREPARE]: {participantId: number};
  [gameNavigations.RESULT]: {participantId: number};
  [gameNavigations.NOTICE]: undefined;
  [gameNavigations.REQUEST]: {participantId: number};
  [gameNavigations.PIN]: {
    pageNumber: number;
    settlementId?: number;
    participantId?: number;
    account?: AccountInfo;
  };
};

const Stack = createStackNavigator<GameStackParamList>();

function ExtraStackNavigator() {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
        headerStyle: {
          shadowColor: 'transparent',
          backgroundColor: colors[theme].WHITE,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Pretendard-Bold',
          paddingLeft: 0,
          marginLeft: 0,
        },
        headerTintColor: colors[theme].BLACK,
      }}>
      <Stack.Screen
        name={gameNavigations.MAIN}
        component={GameMainScreen}
        options={{
          headerShown: true,
          header: () => <NotificationHeader />,
        }}
      />
      <Stack.Screen
        name={gameNavigations.CREATE}
        component={GameCreateScreen}
        options={{
          headerTitle: ' ',
        }}
      />
      <Stack.Screen
        name={gameNavigations.ACCOUNT}
        component={SelectAccountScreen}
        initialParams={{pageNumber: 3}}
        options={{
          headerTitle: ' ',
        }}
      />
      <Stack.Screen
        name={gameNavigations.CATEGORY}
        component={SelectCategoryScreen}
        options={{
          headerTitle: ' ',
        }}
      />
      <Stack.Screen
        name={gameNavigations.DETAIL}
        component={GameDetailScreen}
        options={{
          headerTitle: ' ',
        }}
      />
      <Stack.Screen
        name={gameNavigations.FRIENDS}
        component={GameFriendsScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={gameNavigations.PREPARE}
        component={GamePrepareScreen}
        options={{
          headerTitle: ' ',
        }}
      />
      <Stack.Screen
        name={gameNavigations.RESULT}
        component={GameResultScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={gameNavigations.REQUEST}
        component={GameRequestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={gameNavigations.NOTICE}
        component={NotificationScreen}
        options={{
          headerTitle: '알림',
        }}
      />
      <Stack.Screen
        name={gameNavigations.PIN}
        component={PinCodeScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

export default ExtraStackNavigator;
