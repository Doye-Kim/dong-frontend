import {RightArrowButton} from '@/assets/icons';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface GameItemProps {
  categoryId: string;
  gameCount: string;
  rank: string;
  numberOfParticipants: number;
  isLast: boolean;
}

const GameItem = ({
  categoryId,
  gameCount,
  rank,
  numberOfParticipants,
  isLast
}: GameItemProps) => {
  return (
    <View style={[styles.container, isLast && styles.lastItem]}>
      <View style={styles.leftContainer}>
        <CategoryIcon categoryNumber={Number(categoryId)} size={30} />
        <Text style={styles.gameCount}>{gameCount}회</Text>
      </View>
      <View style={styles.RightContainer}>
        <Text style={styles.rankText}>{rank}</Text>
        <Text style={styles.participantNumberText}>
          {' '}
          / {numberOfParticipants}
        </Text>
        <TouchableOpacity>
          <RightArrowButton />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: colors.GRAY_400,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameCount: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginLeft: 10,
  },
  rankText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  participantNumberText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    marginRight: 10,
    color: colors.BLACK,
  },
});

export default GameItem;
