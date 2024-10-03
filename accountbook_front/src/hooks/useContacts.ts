import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import Toast from 'react-native-toast-message';
import useFriendsStore from '@/store/useFriendsStore';
import {postFriends} from '@/api/friends';
import {Contact} from 'react-native-contacts/type';

// 연락처 권한 요청 및 연락처 불러오기 로직
const requestContactsPermission = async (): Promise<Contact[]> => {
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      const contacts = await Contacts.getAll();
      return contacts;
    } else {
      Toast.show({
        type: 'error',
        text1: '연락처 권한을 허용하지 않으면 내기를 이용할 수 없습니다.',
      });
      return [];
    }
  } catch (err) {
    console.warn(err);
    Toast.show({
      type: 'error',
      text1: '연락처를 불러오는 데 문제가 생겼어요.',
    });
    return [];
  }
};

// Custom hook 정의
const useContacts = () => {
  const {friends, fetchFriends} = useFriendsStore();

  const refreshFriends = async () => {
    console.log('refresh');
    const contacts = await Contacts.getAll();
    const data = await postFriends(contacts);
    await fetchFriends();
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log('useEffect, fetch');
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );

        if (granted) {
          if (friends.length === 0) {
            console.log('friends 업슴');
            await refreshFriends();
          } else {
            console.log('friends 이씀 그냥 넘어감');
          }
        } else {
          const contacts = await requestContactsPermission();
          if (contacts.length > 0 && friends.length === 0) {
            await refreshFriends();
          }
        }
      } catch (err) {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: '연락처를 불러오는 데 문제가 발생했습니다.',
        });
      }
    };

    fetchContacts();
  }, []);

  return {refreshFriends};
};

export default useContacts;
