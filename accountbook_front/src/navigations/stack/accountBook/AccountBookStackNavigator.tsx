import {createStackNavigator} from '@react-navigation/stack';
import AccountBookTabNavigator from './AccountBookTabNavigator';
import AccountBookHeaderNavigator, {
  AccountBookHeaderParamList,
} from './AccountBookHeaderNavigator';

export type AccountBookStackParamList = {
  탭바: undefined;
  헤더: {screen: keyof AccountBookHeaderParamList};
};

const Stack = createStackNavigator();

const AccountBookStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'탭바'}
        component={AccountBookTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'헤더'}
        component={AccountBookHeaderNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AccountBookStackNavigator;
