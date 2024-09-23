import {colors} from '@/constants';
import {Seed} from '@/types/domain';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SeedItem from './SeedItem';

interface SeedListProps {
  seedData: Seed[];
}

const SeedList = ({seedData}: SeedListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>종잣돈 모으기</Text>
      <View style={styles.seedListContainer}></View>
      {seedData.map(seed => (
        <SeedItem
          key={seed.id}
          title={seed.title}
          entireRound={seed.entireRound}
          endDate={seed.endDate}
          passedRound={seed.passedRound}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  seedListContainer: {
    marginHorizontal: 15,
  },
});

export default SeedList;
