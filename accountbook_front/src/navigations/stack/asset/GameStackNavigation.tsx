import { gameNavigations } from '@/constants';
import GameCreateScreen from '@/screen/asset/game/GameCreateScreen';
import GameDetailScreen from '@/screen/asset/game/GameDetailScreen';
import GameFriendsScreen from '@/screen/asset/game/GameFriendsScreen';
import GamePrepareScreen from '@/screen/asset/game/GamePrepareScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Stack = createStackNavigator<GameStackParamList>();

export type GameStackParamList = {
  [gameNavigations.DETAIL]: {gameId: number};
  [gameNavigations.CREATE]: undefined;
  [gameNavigations.FRIENDS]: undefined;
  [gameNavigations.PREPARE]: undefined;
}

const GameStackNavigation = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={gameNavigations.DETAIL}
        component={GameDetailScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={gameNavigations.CREATE}
        component={GameCreateScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={gameNavigations.FRIENDS}
        component={GameFriendsScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={gameNavigations.PREPARE}
        component={GamePrepareScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default GameStackNavigation;