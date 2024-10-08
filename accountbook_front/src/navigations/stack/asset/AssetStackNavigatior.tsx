import {assetNavigations, colors} from '@/constants';
import AssetMainScreen from '@/screen/asset/main/AssetMainScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AssetDetailStackNavigator from './AssetDetailStackNavigator';
import NotificationHeader from '@/components/common/NotificationHeader';
import NotificationScreen from '@/screen/NotificationScreen';
import SeedCreateScreen from '@/screen/asset/seed/SeedCreateScreen';
import SeedDetailScreen from '@/screen/asset/seed/SeedDetailScreen';

export type AssetStackParamList = {
  [assetNavigations.MAIN]: undefined;
  [assetNavigations.DETAIL]: {
    screen: string;
    params: {accountId?: number; cardId?: number; paymentId?: number};
  };
  [assetNavigations.SEEDDETAIL]: {seedId: number};
  [assetNavigations.SEEDCREATE]: undefined;
  [assetNavigations.NOTICE]: undefined;
};

const Stack = createStackNavigator<AssetStackParamList>();

const AssetStackNavigatior = () => {
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
        name={assetNavigations.MAIN}
        component={AssetMainScreen}
        options={{headerShown: true, header: () => <NotificationHeader />}}
      />
      <Stack.Screen
        name={assetNavigations.DETAIL}
        component={AssetDetailStackNavigator}
        options={{headerTitle: '', headerShown: false}}
      />
      <Stack.Screen
        name={assetNavigations.SEEDCREATE}
        component={SeedCreateScreen}
        options={{headerTitle: '', headerShown: false}}
      />
      <Stack.Screen
        name={assetNavigations.SEEDDETAIL}
        component={SeedDetailScreen}
        options={{headerTitle: '', headerShown: false}}
      />
      <Stack.Screen
        name={assetNavigations.NOTICE}
        component={NotificationScreen}
        options={{
          headerTitle: '알림',
        }}
      />
    </Stack.Navigator>
  );
};

export default AssetStackNavigatior;
