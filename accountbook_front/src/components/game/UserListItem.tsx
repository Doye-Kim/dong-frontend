import {User, FriendCheckFill, FriendCheck} from '@/assets/icons';
import {colors} from '@/constants';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Contact} from 'react-native-contacts/type';

const UserListItem = ({
  item: contact,
  setSelectedFriends,
  selectedFriends,
}: {
  item: Contact;
  setSelectedFriends(selectedFriends: []): void;
  selectedFriends: [];
}) => {
  const isSelected = selectedFriends.some(
    friend => friend.name === contact.displayName,
  );

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

  const formatPhoneNumber = (phone: string): string => {
    if (phone.length === 11) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return phone; // 길이가 10자리나 11자리가 아니면 원래 문자열 반환
  };
  return (
    <TouchableOpacity
      style={styles.friendContainer}
      onPress={() => handlePressFriend(contact)}>
      <User width={40} height={40} />
      <View style={styles.contactDetails}>
        <Text key={contact.recordID} style={styles.nameText}>
          {contact.displayName}
        </Text>
        {contact.phoneNumbers[0] && (
          <Text style={styles.numberText}>
            {formatPhoneNumber(contact.phoneNumbers[0].number)}
          </Text>
        )}
      </View>
      {isSelected ? (
        <FriendCheckFill width={40} height={40} />
      ) : (
        <FriendCheck width={40} height={40} />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  contactDetails: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: colors.BLACK,
  },
  numberText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.GRAY_600,
  },
});
export default UserListItem;
