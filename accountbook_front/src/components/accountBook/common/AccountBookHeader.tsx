import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import {
  FilterButton,
  LeftArrowIcon,
  LeftArrowIconDark,
  RightArrowIcon,
  RightArrowIconDark,
} from '@/assets/icons';
import {
  accountBookHeaderNavigations,
  accountBookNavigations,
  colors,
} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import useDateStore from '@/store/useDateStore';
import {getMonthYearDetails} from '@/utils';
import useThemeStore from '@/store/useThemeStore';

const AccountBookHeader = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const date = useDateStore(state => state.date);
  const updateMonth = useDateStore(state => state.updateMonth);

  const navigation =
    useNavigation<StackNavigationProp<AccountBookStackParamList>>();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Pressable
          onPress={() => updateMonth(-1)}
          style={({pressed}) => [
            styles.arrowButton,
            pressed && styles.buttonPressed,
          ]}>
          {theme === 'dark' ? <LeftArrowIconDark /> : <LeftArrowIcon />}
        </Pressable>
        {year === getMonthYearDetails(new Date()).year ? (
          <Text style={styles.monthText}>{month}월</Text>
        ) : (
          <Text style={styles.monthText}>
            {year}년 {month}월
          </Text>
        )}

        <Pressable
          onPress={() => updateMonth(1)}
          style={({pressed}) => [
            styles.arrowButton,
            pressed && styles.buttonPressed,
          ]}>
          {theme === 'dark' ? <RightArrowIconDark /> : <RightArrowIcon />}
        </Pressable>
      </View>
      <View style={styles.rightContainer}>
        <Pressable
          style={({pressed}) => [
            styles.filterButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() =>
            navigation.navigate(accountBookNavigations.HEADER, {
              screen: accountBookHeaderNavigations.FILTER,
            })
          }>
          <FilterButton width={35} height={35} />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.iconButton,
            pressed && [styles.iconButtonPressed, styles.buttonPressed],
          ]}
          onPress={() =>
            navigation.navigate(accountBookNavigations.HEADER, {
              screen: accountBookHeaderNavigations.REPORT,
            })
          }>
          <Text style={styles.iconText}>분석</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: colors[theme].WHITE,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    arrowButton: {
      padding: 0,
    },
    monthText: {
      fontSize: 28,
      width: 'auto',
      marginHorizontal: 10,
      textAlign: 'center',
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    filterButton: {
      padding: 5,
      marginRight: 15,
    },
    iconButton: {
      backgroundColor: colors[theme].ORANGE_200,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      height: 35,
    },
    iconText: {
      color: colors[theme].ORANGE_600,
      fontSize: 16,
      lineHeight: 30,
      textAlignVertical: 'center',
      fontWeight: 'bold',
      fontFamily: 'Pretendard-Medium',
    },
    buttonPressed: {
      opacity: 0.7,
    },
    iconButtonPressed: {
      backgroundColor: colors[theme].ORANGE_400,
    },
  });

export default AccountBookHeader;
