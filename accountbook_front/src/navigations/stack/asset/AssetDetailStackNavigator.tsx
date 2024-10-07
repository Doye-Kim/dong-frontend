import {assetDetailNavigations, assetNavigations, colors} from '@/constants';
import AssetDetailScreen from '@/screen/asset/main/AssetDetailScreen';
import AssetManageScreen from '@/screen/asset/main/AssetManageScreen';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AssetStackParamList} from './AssetStackNavigatior';
import PaymentDetailScreen from '@/screen/accountBook/payment/PaymentDetailScreen';
import CardManageScreen from '@/screen/asset/main/CardManageScreen';
import CardDetailScreen from '@/screen/asset/main/CardDetailScreen';

const Stack = createStackNavigator<AssetDetailStackParamList>();

type AssetDetailStackNavigatorProps = StackScreenProps<
  AssetStackParamList,
  typeof assetNavigations.DETAIL
>;

export type AssetDetailStackParamList = {
  [assetDetailNavigations.ACCOUNTDETAIL]: {accountId?: number};
  [assetDetailNavigations.ACCOUNTMANAGE]: {accountId?: number};
  [assetDetailNavigations.PAYMENTDETAIL]: {paymentId?: number};
  [assetDetailNavigations.CARDDETAIL]: {cardId?: number};
  [assetDetailNavigations.CARDMANAGE]: {cardId?: number};
};

const AssetDetailStackNavigator = ({route}: AssetDetailStackNavigatorProps) => {
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
        name={assetDetailNavigations.ACCOUNTDETAIL}
        component={AssetDetailScreen}
        initialParams={{accountId: route.params?.params?.accountId}}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerTitleStyle: styles.headerTitle,
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(assetDetailNavigations.ACCOUNTMANAGE, {
                  accountId: route.params.accountId,
                })
              }
              style={styles.manageButton}>
              <Text style={styles.manageText}>관리</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={assetDetailNavigations.ACCOUNTMANAGE}
        component={AssetManageScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={assetDetailNavigations.CARDDETAIL}
        component={CardDetailScreen}
        initialParams={{cardId: route.params?.params?.cardId}}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerTitleStyle: styles.headerTitle,
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(assetDetailNavigations.CARDMANAGE, {
                  accountId: route.params.cardId,
                })
              }
              style={styles.manageButton}>
              <Text style={styles.manageText}>관리</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={assetDetailNavigations.CARDMANAGE}
        component={CardManageScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name={assetDetailNavigations.PAYMENTDETAIL}
        component={PaymentDetailScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  manageButton: {
    marginRight: 15,
  },
  manageText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
});

export default AssetDetailStackNavigator;
