import {colors, seedNavigations} from '@/constants';
import SeedCreateScreen from '@/screen/asset/seed/SeedCreateScreen';
import SeedDetailScreen from '@/screen/asset/seed/SeedDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type SeedStackParamList = {
  [seedNavigations.CREATE]: undefined;
  [seedNavigations.DETAIL]: {seedId: number};
};

const Stack = createStackNavigator<SeedStackParamList>();

const SeedStackNavigator = () => {
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
        name={seedNavigations.CREATE}
        component={SeedCreateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={seedNavigations.DETAIL}
        component={SeedDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SeedStackNavigator;
