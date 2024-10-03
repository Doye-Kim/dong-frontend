import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {extraNavigations, colors} from '@/constants';
import PointMarketScreen from '@/screen/extra/PointMarketScreen';
import BudgetMainScreen from '@/screen/accountBook/budget/BudgetMainScreen';
import CategoryEditScreen from '@/screen/category/CategoryEditScreen';
import SpendingReportScreen from '@/screen/common/SpendingReportScreen';
import ExtraMainScreen from '@/screen/extra/ExtraMainScreen';

export type ExtraStackParamList = {
  [extraNavigations.MAIN]: undefined;
  [extraNavigations.MARKET]: {point: Number};
  [extraNavigations.BUDGET]: undefined;
  [extraNavigations.CATEGORY]: undefined;
  [extraNavigations.REPORT]: undefined;
};

const Stack = createStackNavigator<ExtraStackParamList>();

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
        name={extraNavigations.MAIN}
        component={ExtraMainScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={extraNavigations.MARKET}
        component={PointMarketScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={extraNavigations.BUDGET}
        component={BudgetMainScreen}
        options={{
          headerTitle: '예산 관리',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={extraNavigations.CATEGORY}
        component={CategoryEditScreen}
        options={{
          headerTitle: ' ',
        }}
      />
      <Stack.Screen
        name={extraNavigations.REPORT}
        component={SpendingReportScreen}
        options={{
          headerTitle: '소비 리포트',
        }}
      />
    </Stack.Navigator>
  );
}

export default ExtraStackNavigator;
