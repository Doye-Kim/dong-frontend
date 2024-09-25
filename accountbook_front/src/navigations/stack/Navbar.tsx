import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HouseHoldIcon,
  HouseHoldFillIcon,
  MeatballMenuIcon,
  MeatballMenuFillIcon,
  WalletIcon,
  WalletFillIcon,
} from '@/assets/icons';
import {View, StyleSheet} from 'react-native';

import AssetMainScreen from '@/screen/asset/main/AssetMainScreen';
import ExtraMainScreen from '@/screen/extra/ExtraMainScreen';
import AccountBookStackNavigator from './accountBook/AccountBookStackNavigator';
import {Route, getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Navbar = () => {
  const Tab = createBottomTabNavigator();

  const getTabBarVisibility = (route: Partial<Route<string>>) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    if (routeName === '카테고리') {
      return 'none';
    }
    return 'flex';
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle, // 기본 tabBarStyle 적용
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}>
        <Tab.Screen
          name="가계부"
          component={AccountBookStackNavigator}
          options={({route}) => ({
            tabBarIcon: ({focused}) =>
              focused ? <HouseHoldFillIcon /> : <HouseHoldIcon />,
            title: '가계부',
            tabBarStyle: [
              styles.tabBarStyle, // 기본 스타일 병합
              {display: getTabBarVisibility(route)}, // display 속성 덮어쓰기
            ],
          })}
        />
        <Tab.Screen
          name="자산"
          component={AssetMainScreen}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <WalletFillIcon /> : <WalletIcon />,
          }}
        />
        <Tab.Screen
          name="더보기"
          component={ExtraMainScreen}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <MeatballMenuFillIcon /> : <MeatballMenuIcon />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    height: 70,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default Navbar;
