import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarScreen from '@/screen/accountBook/calendar/CalendarScreen';
import {
  HouseHoldIcon,
  HouseHoldFillIcon,
  MeatballMenuIcon,
  MeatballMenuFillIcon,
  WalletIcon,
  WalletFillIcon,
} from '@/assets/icons';
import {View, StyleSheet} from 'react-native';
import BudgetMainScreen from '@/screen/accountBook/budget/BudgetMainScreen';
import BudgetCreateScreen from '@/screen/accountBook/budget/BudgetCreateScreen';
import PaymentDevideScreen from '@/screen/accountBook/payment/PaymentDevideScreen';

const Navbar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 70,
            justifyContent: 'center',
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}>
        <Tab.Screen
          name="가계부"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <HouseHoldFillIcon />
              ) : (
                <HouseHoldIcon />
              ),
            title: '가계부',
            headerShown: true,
            // headerRight: () => NotificationButton(navigation),
          }}
        />
        <Tab.Screen
          name="자산"
          component={BudgetMainScreen}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? <WalletFillIcon /> : <WalletIcon/>,
          }}
        />
        <Tab.Screen
          name="더보기"
          component={PaymentDevideScreen}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <MeatballMenuFillIcon />
              ) : (
                <MeatballMenuIcon />
              ),
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
});

export default Navbar;
