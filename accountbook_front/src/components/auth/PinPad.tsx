import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {colors} from '@/constants';

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Keypad = ({setPin}: {setPin: (pin: number[]) => void}) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const selectNumbers = useRef<number[]>([]);
  useEffect(() => {
    const initialNumbers = [...Array(10).keys()];
    setNumbers(shuffleArray(initialNumbers));
  }, []);

  const handlePress = (num: number) => {
    selectNumbers.current.push(num);
    setPin([...selectNumbers.current]);
    console.log('Pressed:', num);
  };

  const handleBackspace = () => {
    selectNumbers.current.pop();
    setPin([...selectNumbers.current]);
    console.log('Pressed backspace');
  };

  const renderItem = ({item}: {item: number}) => (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
      <TouchableOpacity style={styles.leftButton} onPress={handleBackspace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 320,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('screen').width / 3,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    width: Dimensions.get('screen').width / 3,
    height: 80,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
});

export default Keypad;
