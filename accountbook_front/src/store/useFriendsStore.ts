import {ResponseFriend, getFriends} from '@/api/friends';
import {create} from 'zustand';

interface FriendsState {
  friends: ResponseFriend[];
  setFriends: (friends: ResponseFriend[]) => void;
  fetchFriends: () => Promise<void>;
}

const useFriendsStore = create<FriendsState>(set => ({
  friends: [],
  setFriends: (friends: ResponseFriend[]) => {
    set({friends});
  },
  fetchFriends: async () => {
    try {
      const data = await getFriends();
      set({friends: data});
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
    }
  },
}));

export default useFriendsStore;
