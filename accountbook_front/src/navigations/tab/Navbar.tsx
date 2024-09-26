import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HouseHoldIcon,
  HouseHoldFillIcon,
  MeatballMenuIcon,
  MeatballMenuFillIcon,
  WalletIcon,
  WalletFillIcon,
} from '@/assets/icons';
import { View, StyleSheet } from 'react-native';

import AssetMainScreen from '@/screen/asset/main/AssetMainScreen';
import ExtraMainScreen from '@/screen/extra/ExtraMainScreen';
import AccountBookStackNavigator from '../stack/accountBook/AccountBookStackNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { accountBookNavigations, colors, mainNavigations } from '@/constants';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let Icon;
            switch (route.name) {
              case mainNavigations.ACCOUNTBOOK:
                Icon = focused ? HouseHoldFillIcon : HouseHoldIcon;
                break;
              case mainNavigations.ASSET:
                Icon = focused ? WalletFillIcon : WalletIcon;
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
        })}
      >
        <Tab.Screen 
          name={mainNavigations.ACCOUNTBOOK} 
          component={AccountBookStackNavigator}
          options={({ route }) => ({
            tabBarLabel: '가계부',
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "AccountBookMain";
              console.log(routeName);
              if (routeName === accountBookNavigations.PAYMENTDETAIL || routeName === accountBookNavigations.HEADER) {
                return { display: 'none' };
              }
              return styles.tabBarStyle;
            })(route),
          })}
        />
        <Tab.Screen name={mainNavigations.ASSET} component={AssetMainScreen} options={{tabBarLabel: '자산'}}/>
        <Tab.Screen name={mainNavigations.EXTRA} component={ExtraMainScreen} options={{tabBarLabel: '더보기'}}/>
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
    display: 'flex',
  },
  tabBarText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Light',
    color: colors.BLACK
  }
});

export default Navbar;