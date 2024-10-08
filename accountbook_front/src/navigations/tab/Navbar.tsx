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
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import {
  accountBookNavigations,
  assetNavigations,
  colors,
  extraNavigations,
  gameNavigations,
  mainNavigations,
} from '@/constants';
import ExtraStackNavigator from '../stack/ExtraStackNavigator';
import AssetStackNavigatior from '../stack/asset/AssetStackNavigatior';
import GameStackNavigator from '../stack/GameStackNavigator';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const navigation = useNavigation();
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
          tabBarHideOnKeyboard: true,
          keyboardHidesTabBar: true,
          headerShown: false,
          tabBarLabelStyle: styles.tabBarText,
        })}>
        <Tab.Screen
          name={mainNavigations.ACCOUNTBOOK}
          component={AccountBookStackNavigator}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{name: mainNavigations.ACCOUNTBOOK}],
              });
            },
          }}
          options={({route}) => ({
            tabBarLabel: '가계부',
            tabBarStyle: (route => {
              const routeName =
                getFocusedRouteNameFromRoute(route) ?? 'AccountBookMain';
              if (
                routeName === accountBookNavigations.PAYMENTDETAIL ||
                routeName === accountBookNavigations.HEADER ||
                routeName === accountBookNavigations.SETTLEMENTPAYMENTS ||
                routeName === accountBookNavigations.SETTLEMENTCOST ||
                routeName === accountBookNavigations.SETTLEMENTFRIENDS ||
                routeName === accountBookNavigations.SETTLEMENTREQUEST ||
                routeName === accountBookNavigations.ACCOUNT ||
                routeName === accountBookNavigations.PAYMENTADD ||
                routeName === accountBookNavigations.PAYMENTDIVIDE ||
                routeName === accountBookNavigations.BUDGETCREATE ||
                routeName === accountBookNavigations.PIN ||
                routeName === accountBookNavigations.NOTICE
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
          listeners={{
            tabPress: e => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{name: mainNavigations.ASSET}],
              });
            },
          }}
          options={({route}) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? assetNavigations.MAIN;
            return {
              tabBarLabel: '자산',
              tabBarStyle:
                routeName === assetNavigations.DETAIL ||
                routeName === assetNavigations.GAME ||
                routeName === assetNavigations.SEEDCREATE ||
                routeName === assetNavigations.SEEDDETAIL ||
                routeName === assetNavigations.NOTICE
                  ? {display: 'none'}
                  : styles.tabBarStyle,
            };
          }}
        />
        <Tab.Screen
          name={mainNavigations.GAME}
          component={GameStackNavigator}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{name: mainNavigations.GAME}],
              });
            },
          }}
          options={({route}) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? gameNavigations.MAIN;
            return {
              tabBarLabel: '내기',
              tabBarStyle:
                routeName === gameNavigations.MAIN
                  ? styles.tabBarStyle
                  : {display: 'none'},
            };
          }}
        />
        <Tab.Screen
          name={mainNavigations.EXTRA}
          component={ExtraStackNavigator}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{name: mainNavigations.EXTRA}],
              });
            },
          }}
          options={({route}) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? extraNavigations.MAIN;
            return {
              tabBarLabel: '더보기',
              tabBarStyle:
                routeName === extraNavigations.MAIN
                  ? styles.tabBarStyle
                  : {display: 'none'},
            };
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
