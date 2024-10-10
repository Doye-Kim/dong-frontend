import {accountBookHeaderNavigations, colors} from '@/constants';
import CategoryFilterScreen from '@/screen/common/CategoryFilterScreen';
import SpendingReportScreen from '@/screen/common/SpendingReportScreen';
import useThemeStore from '@/store/useThemeStore';
import {createStackNavigator} from '@react-navigation/stack';
import {Pressable, StyleSheet, Text} from 'react-native';

export type AccountBookHeaderParamList = {
  [accountBookHeaderNavigations.FILTER]: undefined;
  [accountBookHeaderNavigations.REPORT]: undefined;
};

const Stack = createStackNavigator();

const AccountBookHeaderNavigator = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
        headerStyle: {
          shadowColor: 'transparent',
          backgroundColor: colors[theme].WHITE,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Pretendard-Bold',
          paddingLeft: 0,
          marginLeft: 0,
        },
        headerTintColor: colors[theme].BLACK,
      }}>
      <Stack.Screen
        name={accountBookHeaderNavigations.FILTER}
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
        name={accountBookHeaderNavigations.REPORT}
        component={SpendingReportScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    headerTitleText: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    headerRightText: {
      fontSize: 15,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
      marginRight: 20,
    },
  });

export default AccountBookHeaderNavigator;
