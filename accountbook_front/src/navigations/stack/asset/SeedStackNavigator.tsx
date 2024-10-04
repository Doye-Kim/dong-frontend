import {seedNavigations} from '@/constants';
import SeedCreateScreen from '@/screen/asset/seed/SeedCreateScreen';
import SeedDetailScreen from '@/screen/asset/seed/SeedDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export type SeedStackParamList = {
  [seedNavigations.CREATE]: undefined;
  [seedNavigations.DETAIL]: {seedId: number};
};

const Stack = createStackNavigator<SeedStackParamList>();

const SeedStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={seedNavigations.CREATE}
        component={SeedCreateScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={seedNavigations.DETAIL}
        component={SeedDetailScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SeedStackNavigator;
