import {createStackNavigator} from '@react-navigation/stack';
import AccountBookTabNavigator, {
  AccountBookTabParamList,
} from '../../tab/AccountBookTabNavigator';
import AccountBookHeaderNavigator, {
  AccountBookHeaderParamList,
} from './AccountBookHeaderNavigator';
import PaymentDetailScreen from '@/screen/accountBook/payment/PaymentDetailScreen';
import {accountBookNavigations, colors} from '@/constants';
import BudgetCreateScreen from '@/screen/accountBook/budget/BudgetCreateScreen';
import PaymentAddScreen from '@/screen/accountBook/payment/PaymentAddScreen';
import PaymentDivideScreen from '@/screen/accountBook/payment/PaymentDivideScreen';
import {Category, Payment} from '@/types/domain';
import {NavigatorScreenParams} from '@react-navigation/native';
import SettlementCostScreen from '@/screen/accountBook/settlement/SettlementCostScreen';
import SettlementFriendsScreen from '@/screen/accountBook/settlement/SettlementFriendsScreen';
import SettlementPaymentsScreen from '@/screen/accountBook/settlement/SettlementPaymentsScreen';
import SettlementRequestScreen from '@/screen/accountBook/settlement/SettlementRequestScreen';
import SelectAccountScreen from '@/screen/SelectAccountScreen';
import SettlementMainScreen from '@/screen/accountBook/settlement/SettlementMainScreen';


export type AccountBookStackParamList = {
  [accountBookNavigations.TABBAR]:
    | NavigatorScreenParams<AccountBookTabParamList>
    | undefined;
  [accountBookNavigations.HEADER]: {screen: keyof AccountBookHeaderParamList};
  [accountBookNavigations.PAYMENTDETAIL]: {paymentId: number};
  [accountBookNavigations.PAYMENTADD]: undefined;
  [accountBookNavigations.BUDGETCREATE]: {
    categories?: Category[];
    totalBudget: number;
    budgetId: number;
  };
  [accountBookNavigations.ACCOUNT]: {pageNumber: number};
  [accountBookNavigations.SETTLEMENTMAIN]: undefined;
  [accountBookNavigations.SETTLEMENTCOST]: undefined;
  [accountBookNavigations.SETTLEMENTFRIENDS]: undefined;
  [accountBookNavigations.SETTLEMENTPAYMENTS]: undefined;
  [accountBookNavigations.SETTLEMENTREQUEST]: undefined;
  [accountBookNavigations.PAYMENTDIVIDE]: {payment: Payment};
};

const Stack = createStackNavigator();

const AccountBookStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: colors.WHITE}}}>
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
        name={accountBookNavigations.SETTLEMENTMAIN}
        component={SettlementMainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={accountBookNavigations.SETTLEMENTCOST}
        component={SettlementCostScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={accountBookNavigations.SETTLEMENTFRIENDS}
        component={SettlementFriendsScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={accountBookNavigations.SETTLEMENTPAYMENTS}
        component={SettlementPaymentsScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={accountBookNavigations.ACCOUNT}
        component={SelectAccountScreen}
        initialParams={{pageNumber: 1}}
        options={{
          headerTitle: ' ',
        }}
      />
      <Stack.Screen
        name={accountBookNavigations.SETTLEMENTREQUEST}
        component={SettlementRequestScreen}
      />
      <Stack.Screen
        name={accountBookNavigations.PAYMENTDIVIDE}
        component={PaymentDivideScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default AccountBookStackNavigator;
