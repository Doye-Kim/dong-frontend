import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, gameNavigations} from '@/constants';
import {GameStackParamList} from '@/navigations/stack/GameStackNavigator';
import useFriendsStore from '@/store/useFriendsStore';
import CustomButton from '@/components/common/CustomButton';
import UserIcon from '@/components/game/UserIcon';
import UserListItem from '@/components/game/UserListItem';
import {RefreshButton, Search} from '@/assets/icons';
import useContacts from '@/hooks/useContacts';
import {ResponseFriend} from '@/api/friends';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import useGameCreateStore from '@/store/useGameCreateStore';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';

const GameFriendsScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const friends = useFriendsStore(state => state.friends);
  const [selectedFriends, setSelectedFriends] = useState<ResponseFriend[]>([]);
  const [userData, setUserData] = useState();
  const getUser = async () => {
    const user = JSON.parse(await getEncryptStorage('user'));
    setSelectedFriends([
      {
        id: user.id,
        name: user.name,
        nickname: '나',
        phone: user.phone,
      },
    ]);
    setUserData(user);
  };
  const {refreshFriends} = useContacts(); // Custom hook 사용

  useEffect(() => {
    getUser();
  }, []);

  const [searchContacts, setSearchContacts] = useState<ResponseFriend[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const navigation = useNavigation<StackNavigationProp<GameStackParamList>>();

  const handlePressSelectedFriend = data => {
    if (data.nickname !== '나') {
      setSelectedFriends(prev =>
        prev.filter(friend => friend.name !== data.name),
      );
    }
  };

  const handleSearch = (text: string) => {
    setSearchWord(text);
    if (text) {
      const filteredContacts = friends.filter(
        friend =>
          friend.nickname.toLowerCase().includes(text.toLowerCase()) ||
          (friend.phone && friend.phone.includes(text)),
      );
      setSearchContacts(filteredContacts);
    } else {
      setSearchContacts([]);
    }
  };

  const {setParticipantIds} = useGameCreateStore();
  const onPressNext = () => {
    console.log(selectedFriends);
    const filteredIds = selectedFriends
      .filter(friend => friend.nickname !== '나')
      .map(friend => friend.friendId);
    if (filteredIds.length === 0) {
      Toast.show({
        type: 'error',
        text1: '내기는 혼자 진행할 수 없어요',
        text2: '친구를 선택해 주세요',
      });
    } else {
      setParticipantIds(filteredIds);
      navigation.navigate(gameNavigations.CATEGORY);
    }
  };
  const renderItem = ({item}: {item: ResponseFriend}) => {
    return (
      <UserListItem
        item={item}
        selectedFriends={selectedFriends}
        setSelectedFriends={setSelectedFriends}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        내기에 참여할{'\n'}친구들을 선택해주세요
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.selectedContainer}>
        {selectedFriends.map(item => (
          <TouchableOpacity
            key={item.friendId + item.phone}
            onPress={() => handlePressSelectedFriend(item)}
            style={styles.selectedUser}>
            <UserIcon name={item.nickname} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.searchContainer}>
        <Search width={30} height={30} />
        <TextInput
          style={{flex: 1, paddingHorizontal: 10}}
          value={searchWord}
          onChangeText={handleSearch}
        />
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={refreshFriends}>
          <Text style={styles.updateText}>연락처 업데이트</Text>
          <RefreshButton width={20} height={20} />
        </TouchableOpacity>
      </View>
      <View>
        {searchWord && searchContacts.length === 0 ? (
          <View style={styles.listContainer}>
            <Text>결과가 없습니다.</Text>
          </View>
        ) : (
          <FlatList
            data={searchWord ? searchContacts : friends}
            renderItem={renderItem}
            keyExtractor={item => item.friendId.toString()}
            style={styles.listContainer}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="다음" onPress={onPressNext} />
      </View>
    </SafeAreaView>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginBottom: 20,
      flex: 1,
    },
    titleText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
      color: colors[theme].BLACK,
    },
    selectedContainer: {
      flexDirection: 'row',
      marginHorizontal: 5,
      marginTop: 10,
      height: 20,
    },
    selectedUser: {
      marginHorizontal: 5,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      marginTop: 10,
      height: 320,
    },
    searchContainer: {
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors[theme].PRIMARY,
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    updateText: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 15,
      margin: 5,
      color: colors[theme].GRAY_600,
    },
  });

export default GameFriendsScreen;
