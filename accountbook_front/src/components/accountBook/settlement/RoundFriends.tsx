import {ResponseFriend} from '@/api/friends';
import {AddCircle, RefreshButton, Search} from '@/assets/icons';
import UserIcon from '@/components/game/UserIcon';
import UserListItem from '@/components/game/UserListItem';
import {colors} from '@/constants';
import useFriendsStore from '@/store/useFriendsStore';
import {useEffect, useState} from 'react';
import useContacts from '@/hooks/useContacts'; // 새로 만든 hook import
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {ResponsePayment} from '@/screen/accountBook/settlement/SettlementPaymentsScreen';
import useSettlementCreateStore from '@/store/useSettlementCreate';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import Toast from 'react-native-toast-message';

const RoundFriends = ({data}: ResponsePayment) => {
  const {friends} = useFriendsStore();
  const {refreshFriends} = useContacts();
  const {setSettlementUser} = useSettlementCreateStore();
  const [selectedFriends, setSelectedFriends] = useState<
    {userId: number; nickname: string}[]
  >([]);
  const [ghostFriends, setGhostFriends] = useState<
    {userId: number; nickname: string}[]
  >([]);
  const [searchContacts, setSearchContacts] = useState<ResponseFriend[]>([]);
  const [searchWord, setSearchWord] = useState('');

  const getInit = async () => {
    const userData = JSON.parse(await getEncryptStorage('user'));
    console.log(userData);
    setSelectedFriends([{userId: userData.id, nickname: '나'}]);
  };
  useEffect(() => {
    getInit();
  }, []);

  useEffect(() => {
    const newUser = selectedFriends.map(friend => ({
      userId: friend.userId,
      nickname: friend.nickname,
      amount: 0,
    }));
    console.log(newUser);
    setSettlementUser(data.paymentsId, newUser);
  }, [data.paymentsId, selectedFriends, setSettlementUser]);

  const handlePressSelectedFriend = data => {
    if (data.nickname !== '나' && data.userId > -1) {
      setSelectedFriends(prev =>
        prev.filter(friend => friend.userId !== data.userId),
      );
    } else if (data.nickname !== '나' && data.userId < 0) {
      setGhostFriends(prev =>
        prev.filter(ghost => ghost.nickname !== `친구${ghostFriends.length}`),
      );
      setSelectedFriends(prev =>
        prev.filter(ghost => ghost.nickname !== `친구${ghostFriends.length}`),
      );
    }
  };
  const handlePressGhost = () => {
    if (ghostFriends.length > 30) {
      Toast.show({
        type: 'error',
        text1: '번호 없는 친구는 최대 30명까지 생성할 수 있습니다.',
      });
    } else {
      const uniqueId = -(ghostFriends.length + 1); // 고유 ID 생성
      const nickname = `친구${ghostFriends.length + 1}`;
      setSelectedFriends(prev => [
        {userId: uniqueId, nickname: nickname},
        ...prev,
      ]);
      setGhostFriends(prev => [
        {userId: uniqueId, nickname: nickname},
        ...prev,
      ]);
    }
  };
  const handleSearch = (text: string) => {
    setSearchWord(text);
    if (text) {
      const filteredContacts = friends.filter(
        friend =>
          friend.name.toLowerCase().includes(text.toLowerCase()) ||
          (friend.phone && friend.phone.includes(text)),
      );
      setSearchContacts(filteredContacts);
    } else {
      setSearchContacts([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 10}}>
        <Text style={styles.merchantNameText}>{data.merchantName}</Text>
        <Text style={styles.balanceText}>
          {data.balance.toLocaleString()}원
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <Search width={30} height={30} />
        <TextInput
          style={{flex: 1, paddingHorizontal: 10}}
          value={searchWord}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View style={styles.selectedContainer}>
          {selectedFriends.map(item => (
            <TouchableOpacity
              key={item.friendId}
              onPress={() => handlePressSelectedFriend(item)}
              style={styles.selectedUser}>
              <UserIcon name={item.nickname} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addGhost} onPress={handlePressGhost}>
        <AddCircle width={35} height={35} />
        <Text style={styles.addGhostText}>번호 없는 친구 추가</Text>
      </TouchableOpacity>
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
          <Text style={{height: 230}}>결과가 없습니다.</Text>
        ) : (
          <ScrollView style={{height: 230}}>
            {searchWord
              ? searchContacts.map(item => (
                  <UserListItem
                    key={item.friendId}
                    item={item}
                    selectedFriends={selectedFriends}
                    setSelectedFriends={setSelectedFriends}
                    style={styles.listContainer}
                  />
                ))
              : friends.map(item => (
                  <UserListItem
                    key={item.friendId}
                    item={item}
                    selectedFriends={selectedFriends}
                    setSelectedFriends={setSelectedFriends}
                    style={styles.listContainer}
                  />
                ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').height - 300,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    padding: 10,
  },
  merchantNameText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.BLACK,
  },
  balanceText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
  selectedContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 10,
    height: 80,
  },
  selectedUser: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: 10,
    height: 300,
  },
  searchContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  addGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.GRAY_600,
    paddingBottom: 5,
    height: 35,
  },
  addGhostText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 18,
    color: colors.BLACK,
    marginLeft: 5,
  },
  updateText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 15,
    margin: 5,
    color: colors.GRAY_600,
  },
});

export default RoundFriends;
