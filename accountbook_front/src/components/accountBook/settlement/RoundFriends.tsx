import {AddCircle, Search} from '@/assets/icons';
import UserIcon from '@/components/game/UserIcon';
import UserListItem from '@/components/game/UserListItem';
import {colors} from '@/constants';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Contacts from 'react-native-contacts';
import {Contact} from 'react-native-contacts/type';

const requestContactsPermission = async (): Promise<Contact[]> => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );

    if (granted) {
      const contacts = await Contacts.getAll();
      return contacts; // Contact 배열 반환
    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        const contacts = await Contacts.getAll();
        return contacts; // Contact 배열 반환
      } else {
        return []; // 권한이 거부된 경우 빈 배열 반환
      }
    }
  } catch (err) {
    console.warn(err);
    return [];
  }
};

interface RoundProps {
  settlementPaymentId: number;
  paymentId: number;
  balance: number;
  merchantName: string;
  paymentName: string;
  categoryName: string;
  imageNumber: number;
}
const RoundFriends = ({data}: RoundProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<
    {id: number; name: string}[]
  >([{id: 0, name: '나'}]);
  const [ghostFriends, setGhostFriends] = useState<
    {id: number; name: string}[]
  >([]);
  const [searchContacts, setSearchContacts] = useState<Contact[]>([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await requestContactsPermission();
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  const handlePressSelectedFriend = data => {
    if (data.name !== '나' && data.id > -1) {
      setSelectedFriends(prev => prev.filter(friend => friend.id !== data.id));
    } else if (data.name !== '나' && data.id < 0) {
      setGhostFriends(prev =>
        prev.filter(ghost => ghost.name !== `친구${ghostFriends.length}`),
      );
      setSelectedFriends(prev =>
        prev.filter(ghost => ghost.name !== `친구${ghostFriends.length}`),
      );
    }
  };
  const handlePressGhost = () => {
    const uniqueId = -(ghostFriends.length + 1); // 고유 ID 생성
    const name = `친구${ghostFriends.length + 1}`;
    setSelectedFriends(prev => [{id: uniqueId, name: name}, ...prev]);
    setGhostFriends(prev => [{id: uniqueId, name: name}, ...prev]);
  };
  const handleSearch = (text: string) => {
    setSearchWord(text);
    if (text) {
      const filteredContacts = contacts.filter(
        contact =>
          contact.displayName.toLowerCase().includes(text.toLowerCase()) ||
          (contact.phoneNumbers[0] &&
            contact.phoneNumbers[0].number.includes(text)),
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
              key={item.id}
              onPress={() => handlePressSelectedFriend(item)}
              style={styles.selectedUser}>
              <UserIcon name={item.name} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addGhost} onPress={handlePressGhost}>
        <AddCircle width={35} height={35} />
        <Text style={styles.addGhostText}>번호 없는 친구 추가</Text>
      </TouchableOpacity>
      <View>
        {searchWord && searchContacts.length === 0 ? (
          <Text>결과가 없습니다.</Text>
        ) : (
          <ScrollView style={{height: 250}}>
            {searchWord
              ? searchContacts.map(item => (
                  <UserListItem
                    key={item.recordID}
                    item={item}
                    selectedFriends={selectedFriends}
                    setSelectedFriends={setSelectedFriends}
                    style={styles.listContainer}
                  />
                ))
              : contacts.map(item => (
                  <UserListItem
                    key={item.recordID}
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
    marginVertical: 10,
    height: 80,
  },
  selectedUser: {
    margin: 5,
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
  },
  addGhostText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 18,
    color: colors.BLACK,
    marginLeft: 5,
  },
});

export default RoundFriends;
