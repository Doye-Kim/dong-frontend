import {
  CategoryCheckEmptyIcon,
  FriendCheck,
  FriendCheckFill,
  Search,
  User,
} from '@/assets/icons';
import CustomButton from '@/components/common/CustomButton';
import UserIcon from '@/components/game/UserIcon';
import UserListItem from '@/components/game/UserListItem';
import {colors} from '@/constants';
import {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
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

const GameFriendsScreen = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<
    {id: number; name: string}[]
  >([{id: 0, name: '나'}]);

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
    if (data.name !== '나') {
      console.log('sk', data);
      setSelectedFriends(prev =>
        prev.filter(friend => friend.name !== data.name),
      );
    }
  };

  const handlePressFriend = (contact: Contact) => {
    const isSelected = selectedFriends.some(
      friend => friend.name === contact.displayName,
    );

    if (isSelected) {
      setSelectedFriends(prev =>
        prev.filter(friend => friend.name !== contact.displayName),
      );
    } else {
      setSelectedFriends(prev => [
        {id: contact.recordID, name: contact.displayName},
        ...prev,
      ]);
    }
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

  const formatPhoneNumber = (phone: string): string => {
    if (phone.length === 11) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return phone; // 길이가 10자리나 11자리가 아니면 원래 문자열 반환
  };

  const renderItem = ({item}: {item: Contact}) => {
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      <View style={styles.searchContainer}>
        <Search width={30} height={30} />
        <TextInput
          style={{flex: 1, paddingHorizontal: 10}}
          value={searchWord}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        {searchWord && searchContacts.length === 0 ? (
          <Text>결과가 없습니다.</Text>
        ) : (
          <FlatList
            data={searchWord ? searchContacts : contacts}
            renderItem={renderItem}
            keyExtractor={item => item.recordID.toString()}
            style={styles.listContainer}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="내기 신청하기" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
    flex: 1,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
  selectedContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default GameFriendsScreen;
