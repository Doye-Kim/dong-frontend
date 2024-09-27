import {assetNavigations, colors, seedNavigations} from '@/constants';
import { AssetStackParamList } from '@/navigations/stack/asset/AssetStackNavigatior';
import { SeedStackParamList } from '@/navigations/stack/asset/SeedStackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

interface SeedItemProps {
  id: number;
  title: string;
  entireRound: string;
  endDate: string;
  passedRound: string;
}

const SeedItem = ({
  id,
  title,
  entireRound,
  endDate,
  passedRound,
}: SeedItemProps) => {
  const progressPercentage = Number(passedRound) / Number(entireRound);
  const navigation = useNavigation<NavigationProp<AssetStackParamList>>();
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(assetNavigations.SEED, {screen: seedNavigations.DETAIL, params: {seedId: id}})}>
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
