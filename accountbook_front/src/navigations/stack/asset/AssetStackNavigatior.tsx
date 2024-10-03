import {assetNavigations, colors} from '@/constants';
import AssetMainScreen from '@/screen/asset/main/AssetMainScreen';
import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AssetDetailStackNavigator, {
  AssetDetailStackParamList,
} from './AssetDetailStackNavigator';
import SeedStackNavigator from './SeedStackNavigator';

export type AssetStackParamList = {
  [assetNavigations.MAIN]: undefined;
  [assetNavigations.DETAIL]: {
    screen: string;
    params: {accountId?: number; cardId?: number; paymentId?: number};
  };
  [assetNavigations.SEED]: {screen: string; params: {seedId?: number}};
};

const Stack = createStackNavigator<AssetStackParamList>();

const AssetStackNavigatior = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={assetNavigations.MAIN}
        component={AssetMainScreen}
        options={{headerTitle: '', headerShown: false}}
      />
      <Stack.Screen
        name={assetNavigations.DETAIL}
        component={AssetDetailStackNavigator}
        options={{headerTitle: '', headerShown: false}}
      />
      <Stack.Screen
        name={assetNavigations.SEED}
        component={SeedStackNavigator}
        options={{headerTitle: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  manageButton: {
    marginRight: 15,
  },
  manageText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
});

export default AssetStackNavigatior;
