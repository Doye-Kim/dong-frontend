import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {gameNavigations, colors} from '@/constants';
import GameMainScreen from '@/screen/asset/game/GameMainScreen';
import GameCreateScreen from '@/screen/asset/game/GameCreateScreen';
import GameDetailScreen from '@/screen/asset/game/GameDetailScreen';
import GameFriendsScreen from '@/screen/asset/game/GameFriendsScreen';
import GamePrepareScreen from '@/screen/asset/game/GamePrepareScreen';
import SelectAccountScreen from '@/screen/SelectAccountScreen';
import SelectCategoryScreen from '@/screen/asset/game/SelectCategoryScreen';
import GameResultScreen from '@/screen/asset/game/GameResultScreen';
import {Category} from '@/api/game';
import NotificationHeader from '@/components/common/NotificationHeader';
import NotificationScreen from '@/screen/NotificationScreen';
import GameRequestScreen from '@/screen/asset/game/GameRequestScreen';

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
};

const Stack = createStackNavigator<GameStackParamList>();

function ExtraStackNavigator() {
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
          headerTitle: ' ',
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
    </Stack.Navigator>
  );
}

export default ExtraStackNavigator;
