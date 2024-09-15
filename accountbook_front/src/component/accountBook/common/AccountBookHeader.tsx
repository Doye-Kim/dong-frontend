import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import {FilterButton, LeftArrowIcon, RightArrowIcon} from '../../../assets/icons';
import { colors } from '../../../constants';

function AccountBookHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Pressable style={({pressed}) => [styles.arrowButton, pressed && styles.buttonPressed]}>
          <LeftArrowIcon size={24} style={styles.arrowIcon} />
        </Pressable>
        <Text style={styles.monthText}>8월</Text>
        <Pressable style={({pressed}) => [styles.arrowButton, pressed && styles.buttonPressed]}>
          <RightArrowIcon size={24} style={styles.arrowIcon} />
        </Pressable>
      </View>
      <View style={styles.rightContainer}>
        <Pressable style={({pressed}) => [styles.filterButton, pressed && styles.buttonPressed]}>
          <FilterButton size={24}/>
        </Pressable>
        <Pressable style={({pressed}) => [styles.iconButton, pressed && [styles.iconButtonPressed, styles.buttonPressed]]}>
          <Text style={styles.iconText}>분석</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
    padding: 5,
  },
  arrowIcon: {
    color: '#000000',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
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
  },
  buttonPressed: {
    opacity: 0.7,
  },
  iconButtonPressed: {
    backgroundColor: colors.ORANGE_400,
  },
});

export default AccountBookHeader;