import {colors} from '@/constants';
import {Game} from '@/types/domain';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GameItem from './GameItem';

interface GameListProps {
  gameData: Game[];
}

const GameList = ({gameData}: GameListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>진행중인 내기</Text>
      <View style={styles.gameListContainer}>
      {gameData.map((game, index) => (
        <GameItem
          key={game.gameId}
          categoryId={game.categoryId}
          gameCount={game.gameCount}
          rank={game.rank}
          numberOfParticipants={game.participants.length}
          isLast={index === gameData.length-1}
        />
      ))}
      </View>
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
  gameListContainer: {
    backgroundColor: colors.GRAY_300,
    marginHorizontal: 15,
    borderRadius: 8
  },
});

export default GameList;
