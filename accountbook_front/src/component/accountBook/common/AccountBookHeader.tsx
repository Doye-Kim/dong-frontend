import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import {FilterButton, LeftArrowIcon, RightArrowIcon} from '@/assets/icons';
import {colors} from '@/constants';
import {MonthYear} from '@/utils/date';

interface CustomCalendarHeaderProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

const AccountBookHeader = ({
  monthYear,
  onChangeMonth,
}: CustomCalendarHeaderProps) => {
  const {month, year} = monthYear;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Pressable
          onPress={() => onChangeMonth(-1)}
          style={({pressed}) => [
            styles.arrowButton,
            pressed && styles.buttonPressed,
          ]}>
          <LeftArrowIcon size={24} style={styles.arrowIcon} />
        </Pressable>
        <Text style={styles.monthText}>{month}월</Text>
        <Pressable
          onPress={() => onChangeMonth(1)}
          style={({pressed}) => [
            styles.arrowButton,
            pressed && styles.buttonPressed,
          ]}>
          <RightArrowIcon size={24} style={styles.arrowIcon} />
        </Pressable>
      </View>
      <View style={styles.rightContainer}>
        <Pressable
          style={({pressed}) => [
            styles.filterButton,
            pressed && styles.buttonPressed,
          ]}>
          <FilterButton size={24} />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.iconButton,
            pressed && [styles.iconButtonPressed, styles.buttonPressed],
          ]}>
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
  arrowIcon: {
    color: '#000000',
  },
  monthText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 10,
    width: 70,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
  },
  filterButton: {
    padding: 5,
    marginRight: 15,
  },
  iconButton: {
    backgroundColor: colors.ORANGE_200,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  iconText: {
    color: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Light',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  iconButtonPressed: {
    backgroundColor: colors.ORANGE_400,
  },
});

export default AccountBookHeader;
