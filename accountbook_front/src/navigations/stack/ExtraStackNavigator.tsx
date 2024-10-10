import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {extraNavigations, colors} from '@/constants';
import PointMarketScreen from '@/screen/extra/PointMarketScreen';
import BudgetMainScreen from '@/screen/accountBook/budget/BudgetMainScreen';
import CategoryEditScreen from '@/screen/category/CategoryEditScreen';
import SpendingReportScreen from '@/screen/common/SpendingReportScreen';
import ExtraMainScreen from '@/screen/extra/ExtraMainScreen';
import NotificationScreen from '@/screen/NotificationScreen';
import NotificationHeader from '@/components/common/NotificationHeader';
import CategoryFilterScreen from '@/screen/common/CategoryFilterScreen';
import useThemeStore from '@/store/useThemeStore';

export type ExtraStackParamList = {
  [extraNavigations.MAIN]: undefined;
  [extraNavigations.MARKET]: {point: Number};
  [extraNavigations.BUDGET]: undefined;
  [extraNavigations.CATEGORY]: undefined;
  [extraNavigations.CATEGORYFILTER]: undefined;
  [extraNavigations.REPORT]: undefined;
  [extraNavigations.NOTICE]: undefined;
};

const Stack = createStackNavigator<ExtraStackParamList>();

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
        name={extraNavigations.MAIN}
        component={ExtraMainScreen}
        options={{
          headerShown: true,
          header: () => <NotificationHeader />,
        }}
      />
      <Stack.Screen
        name={extraNavigations.MARKET}
        component={PointMarketScreen}
        options={{
          headerTitle: ' ',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={extraNavigations.BUDGET}
        component={BudgetMainScreen}
        options={{
          headerTitle: '',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={extraNavigations.CATEGORY}
        component={CategoryEditScreen}
        options={{
          headerTitle: ' ',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={extraNavigations.REPORT}
        component={SpendingReportScreen}
        options={{
          headerTitle: ' ',
        }}
      />
      <Stack.Screen
        name={extraNavigations.NOTICE}
        component={NotificationScreen}
        options={{
          headerTitle: '알림',
        }}
      />
      <Stack.Screen
        name={extraNavigations.CATEGORYFILTER}
        component={CategoryFilterScreen}
        options={({navigation}) => ({
          title: '카테고리 필터링',
        })}
      />
    </Stack.Navigator>
  );
}

export default ExtraStackNavigator;
