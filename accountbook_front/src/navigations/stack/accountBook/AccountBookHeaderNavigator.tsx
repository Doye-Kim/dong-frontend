import { colors } from '@/constants';
import CategoryFilterScreen from '@/screen/common/CategoryFilterScreen';
import SpendingReportScreen from '@/screen/common/SpendingReportScreen';
import {createStackNavigator} from '@react-navigation/stack';
import { Pressable, StyleSheet, Text } from 'react-native';

export type AccountBookHeaderParamList = {
  카테고리: undefined;
  분석: undefined;
};

const Stack = createStackNavigator();

const AccountBookHeaderNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'카테고리'}
        component={CategoryFilterScreen}
        options={({navigation}) => ({
          title: '카테고리 필터링',
          headerRight: () => (
            <Pressable
              onPress={() => {
                /* 완료 버튼 동작 */
              }}>
              <Text style={styles.headerRightText}>완료</Text>
            </Pressable>
          ),
          headerTitleStyle: styles.headerTitleText,
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="분석"
        component={SpendingReportScreen}
        options={{title: ""}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  headerRightText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginRight: 20,
  }
})

export default AccountBookHeaderNavigator;
