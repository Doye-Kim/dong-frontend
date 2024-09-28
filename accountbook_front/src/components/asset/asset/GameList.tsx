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
      <View style={styles.gameListContainer}>
        {gameData.map((game, index) => (
          <GameItem
            key={game.gameId}
            gameId={Number(game.gameId)}
            categoryId={game.categoryId}
            gameCount={game.gameCount}
            rank={game.rank}
            numberOfParticipants={game.participants.length}
            isLast={index === gameData.length - 1}
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
  gameListContainer: {
    backgroundColor: colors.GRAY_300,
    marginHorizontal: 15,
    borderRadius: 8,
  },
});

export default GameList;
