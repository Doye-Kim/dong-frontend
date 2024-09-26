import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import {FilterButton, LeftArrowIcon, RightArrowIcon} from '@/assets/icons';
import {accountBookHeaderNavigations, accountBookNavigations, colors} from '@/constants';
import {MonthYear} from '@/utils/date';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';

interface CustomCalendarHeaderProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

const AccountBookHeader = ({
  monthYear,
  onChangeMonth,
}: CustomCalendarHeaderProps) => {
  const {month, year} = monthYear;
  const navigation =
    useNavigation<StackNavigationProp<AccountBookStackParamList>>();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Pressable
          onPress={() => onChangeMonth(-1)}
          style={({pressed}) => [
            styles.arrowButton,
            pressed && styles.buttonPressed,
          ]}>
          <LeftArrowIcon />
        </Pressable>
        <Text style={styles.monthText}>{month}월</Text>
        <Pressable
          onPress={() => onChangeMonth(1)}
          style={({pressed}) => [
            styles.arrowButton,
            pressed && styles.buttonPressed,
          ]}>
          <RightArrowIcon />
        </Pressable>
      </View>
      <View style={styles.rightContainer}>
        <Pressable
          style={({pressed}) => [
            styles.filterButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate(accountBookNavigations.HEADER, {screen: accountBookHeaderNavigations.FILTER})}>
          <FilterButton width={35} height={35} />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.iconButton,
            pressed && [styles.iconButtonPressed, styles.buttonPressed],
          ]}
          onPress={() => navigation.navigate(accountBookNavigations.HEADER, {screen: accountBookHeaderNavigations.REPORT})}>
          <Text style={styles.iconText}>분석</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
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
    width: 70,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  filterButton: {
    padding: 5,
    marginRight: 15,
  },
  iconButton: {
    backgroundColor: colors.ORANGE_200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 35,
  },
  iconText: {
    color: colors.ORANGE_600,
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
    backgroundColor: colors.ORANGE_400,
  },
});

export default AccountBookHeader;
