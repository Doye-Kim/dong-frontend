import {createStackNavigator} from '@react-navigation/stack';
import AccountBookTabNavigator from '../../tab/AccountBookTabNavigator';
import AccountBookHeaderNavigator, {
  AccountBookHeaderParamList,
} from './AccountBookHeaderNavigator';
import PaymentDetailScreen from '@/screen/accountBook/payment/PaymentDetailScreen';
import {accountBookNavigations} from '@/constants';
import BudgetCreateScreen from '@/screen/accountBook/budget/BudgetCreateScreen';
import BudgetMainScreen from '@/screen/accountBook/budget/BudgetMainScreen';
import PaymentAddScreen from '@/screen/accountBook/payment/PaymentAddScreen';

export type AccountBookStackParamList = {
  [accountBookNavigations.TABBAR]: undefined;
  [accountBookNavigations.HEADER]: {screen: keyof AccountBookHeaderParamList};
  [accountBookNavigations.PAYMENTDETAIL]: {paymentId: number};
  [accountBookNavigations.PAYMENTADD]: undefined;
  [accountBookNavigations.BUDGETCREATE]: undefined;
  [accountBookNavigations.BUDGET]: undefined;
};

const Stack = createStackNavigator();

const AccountBookStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={accountBookNavigations.TABBAR}
        component={AccountBookTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={accountBookNavigations.HEADER}
        component={AccountBookHeaderNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={accountBookNavigations.PAYMENTDETAIL}
        component={PaymentDetailScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={accountBookNavigations.PAYMENTADD}
        component={PaymentAddScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={accountBookNavigations.BUDGETCREATE}
        component={BudgetCreateScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={accountBookNavigations.BUDGET}
        component={BudgetMainScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default AccountBookStackNavigator;
