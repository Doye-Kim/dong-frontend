import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screen/accountBook/calendar/CalendarScreen';
import {
  HouseHoldIcon,
  HouseHoldFillIcon,
  MeatballMenuIcon,
  MeatballMenuFillIcon,
  WalletIcon,
  WalletFillIcon
} from '../assets/icons';
import {View, StyleSheet} from 'react-native';

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
              focused ? <HouseHoldFillIcon size={30} /> : <HouseHoldIcon size={30} />,
            title: "캘린더",
            headerShown: true,
            // headerRight: () => NotificationButton(navigation),
          }}
        />
        <Tab.Screen
          name="자산"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => 
              focused ? <WalletFillIcon size={30} /> : <WalletIcon size={30} />,
          }}
        />
        <Tab.Screen
          name="더보기"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => 
              focused ? <MeatballMenuFillIcon size={30} /> : <MeatballMenuIcon size={30} />,
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