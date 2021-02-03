import firebase from '@/lib/firebase';

export interface User {
  id: string;
  name: string;
  imgPath: string;
  provider: string;
}

export const toUser = (fbUserObj: firebase.User): User => ({
  id: fbUserObj.uid,
  name: fbUserObj.displayName ?? '',
  imgPath: fbUserObj.photoURL ?? '',
  provider: fbUserObj.providerData[0]?.providerId ?? '',
});
