import {Seed} from '@/types/domain';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SeedItem from './SeedItem';

interface SeedListProps {
  seedData: Seed[];
}

const SeedList = ({seedData}: SeedListProps) => {
  return (
    <View style={styles.container}>
      {seedData.map(seed => (
        <SeedItem
          key={seed.id}
          id={Number(seed.id)}
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
    marginBottom: 5,
  },
});

export default SeedList;
