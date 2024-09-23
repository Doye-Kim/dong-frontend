import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

interface SeedItemProps {
  title: string;
  entireRound: string;
  endDate: string;
  passedRound: string;
}

const SeedItem = ({
  title,
  entireRound,
  endDate,
  passedRound,
}: SeedItemProps) => {
  const progressPercentage = Number(passedRound) / Number(entireRound);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{title}</Text>
        <View style={styles.countContainer}>
          <Text style={styles.roundText}>{passedRound}회</Text>
          <Text style={styles.entireRoundText}> / {entireRound}회</Text>
        </View>
      </View>
      <ProgressBar
        progress={progressPercentage}
        color={colors.ORANGE_600}
        style={styles.progressBar}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 15,
    borderRadius: 20,
  },
  roundText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  entireRoundText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    marginRight: 5,
    color: colors.BLACK,
  },
});

export default SeedItem;
