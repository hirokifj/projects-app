import firebase, { auth, storage } from '@/lib/firebase';
import { getHash } from '@/utils/hash';
import { getCurrentUnixtime } from '@/utils/date';
import { isString } from '@/utils/string';

const getCurrentUser: () => firebase.User = () => {
  const { currentUser } = auth();
  if (!currentUser) throw new Error('UnAuthorized.');

  return currentUser;
};

export const updateUserName = (userName: string) =>
  getCurrentUser().updateProfile({
    displayName: userName,
  });

export const updateUserImg = async (userImg: File) => {
  const fileName = getHash(userImg.name + getCurrentUnixtime.toString());

  const storageRef = storage().ref().child(`images/${fileName}`);

  await storageRef.put(userImg);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newImgPath = await storageRef.getDownloadURL();

  if (isString(newImgPath)) {
    await getCurrentUser().updateProfile({
      photoURL: newImgPath,
    });
  }
};

export const fetchUserEmail = (): string | null => {
  try {
    return getCurrentUser().email;
  } catch (err) {
    return null;
  }
};
export const updateUserEmail = (
  newEmail: string,
  password: string,
): Promise<void> =>
  reAuthEmailUser(password).then(() => getCurrentUser().updateEmail(newEmail));

const reAuthEmailUser = (
  currentPass: string,
): Promise<firebase.auth.UserCredential> => {
  const user = getCurrentUser();
  if (!user.email) throw new Error('invalid user');

  const credential = auth.EmailAuthProvider.credential(user.email, currentPass);

  return getCurrentUser().reauthenticateWithCredential(credential);
};
