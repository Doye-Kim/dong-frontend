import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HouseHoldIcon,
  HouseHoldFillIcon,
  MeatballMenuIcon,
  MeatballMenuFillIcon,
  WalletIcon,
  WalletFillIcon,
  GameFillIcon,
  GameIcon,
} from '@/assets/icons';
import {View, StyleSheet} from 'react-native';

import AccountBookStackNavigator from '../stack/accountBook/AccountBookStackNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {
  accountBookNavigations,
  assetNavigations,
  colors,
  gameNavigations,
  mainNavigations,
} from '@/constants';
import ExtraStackNavigator from '../stack/ExtraStackNavigator';
import AssetStackNavigatior from '../stack/asset/AssetStackNavigatior';
import GameStackNavigator from '../stack/GameStackNavigator';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let Icon;
            switch (route.name) {
              case mainNavigations.ACCOUNTBOOK:
                Icon = focused ? HouseHoldFillIcon : HouseHoldIcon;
                break;
              case mainNavigations.ASSET:
                Icon = focused ? WalletFillIcon : WalletIcon;
                break;
              case mainNavigations.GAME:
                Icon = focused ? GameFillIcon : GameIcon;
                break;
              case mainNavigations.EXTRA:
                Icon = focused ? MeatballMenuFillIcon : MeatballMenuIcon;
                break;
              default:
                Icon = HouseHoldIcon;
            }
            return <Icon />;
          },
          tabBarStyle: styles.tabBarStyle,
          headerShown: false,
          tabBarLabelStyle: styles.tabBarText,
        })}>
        <Tab.Screen
          name={mainNavigations.ACCOUNTBOOK}
          component={AccountBookStackNavigator}
          options={({route}) => ({
            tabBarLabel: '가계부',
            tabBarStyle: (route => {
              const routeName =
                getFocusedRouteNameFromRoute(route) ?? 'AccountBookMain';
              if (
                routeName === accountBookNavigations.PAYMENTDETAIL ||
                routeName === accountBookNavigations.HEADER ||
                routeName === accountBookNavigations.PAYMENTADD ||
                routeName === accountBookNavigations.PAYMENTDIVIDE
              ) {
                return {display: 'none'};
              }
              return styles.tabBarStyle;
            })(route),
          })}
        />
        <Tab.Screen
          name={mainNavigations.ASSET}
          component={AssetStackNavigatior}
          options={({route}) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? assetNavigations.MAIN;
            return {
              tabBarLabel: '자산',
              tabBarStyle:
                routeName === assetNavigations.DETAIL ||
                routeName === assetNavigations.GAME ||
                routeName === assetNavigations.SEED
                  ? {display: 'none'}
                  : styles.tabBarStyle,
            };
          }}
        />
        <Tab.Screen
          name={mainNavigations.GAME}
          component={GameStackNavigator}
          options={({route}) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? gameNavigations.MAIN;
            return {
              tabBarLabel: '내기',
              tabBarStyle:
                routeName === gameNavigations.CREATE ||
                routeName === gameNavigations.CATEGORY ||
                routeName === gameNavigations.FRIENDS ||
                routeName === gameNavigations.ACCOUNT ||
                routeName === gameNavigations.DETAIL ||
                routeName === gameNavigations.PREPARE ||
                routeName === gameNavigations.RESULT
                  ? {display: 'none'}
                  : styles.tabBarStyle,
            };
          }}
        />
        <Tab.Screen
          name={mainNavigations.EXTRA}
          component={ExtraStackNavigator}
          options={{tabBarLabel: '더보기'}}
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
    backgroundColor: colors.WHITE,
    height: 70,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    display: 'flex',
  },
  tabBarText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Light',
    color: colors.BLACK,
  },
});

export default Navbar;
