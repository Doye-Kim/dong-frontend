import axiosInstance from './axios';

export type ResponseFriend = {
  id: number;
  nickname: string;
  name: string;
  phone: string;
};

const getFriends = async (): Promise<ResponseFriend[]> => {
  const {data} = await axiosInstance.get('/friends');
  return data;
};

export type RequestFriend = {
  nickname: string;
  phone: string;
};

export type RequestFriends = {
  registerFriendsRequestDto: RequestFriend[];
};
// Contacts 배열을 RequestFriend 배열로 변환하는 함수
const mapContactsToRequestFriends = (contacts: any[]): RequestFriend[] => {
  return contacts.map(contact => {
    return {
      nickname: contact.displayName, // contact의 displayName을 RequestFriend의 nickname에 매핑
      phone: contact.phoneNumbers[0]?.number || '', // phoneNumbers[0]가 존재하는지 확인하고, number를 phone에 매핑
    };
  });
};

const postFriends = async (contacts: any): Promise<ResponseFriend[]> => {
  const registerFriendsRequestDto = mapContactsToRequestFriends(contacts);
  console.log('register', registerFriendsRequestDto);
  const {data} = await axiosInstance.post('/friends', {
    registerFriendsRequestDto,
  });
  console.log('postdata', data);
  return data;
};

export {getFriends, postFriends};
