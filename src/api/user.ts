import firebase, { auth, storage } from '@/lib/firebase';
import { User } from '@/types/user';
import { getHash } from '@/utils/hash';
import { getCurrentUnixtime } from '@/utils/date';
import { isString } from '@/utils/string';

const getCurrentUser: () => firebase.User = () => {
  const { currentUser } = auth();
  if (!currentUser) throw new Error('UnAuthorized.');

  return currentUser;
};

interface updatedResult {
  readonly isUpdated: true;
  readonly newUserData: User;
}

interface unUpdatedResult {
  readonly isUpdated: false;
}

export const updateUser = async ({
  userName,
  userImg,
}: {
  userName: User['name'];
  userImg: FileList;
}): Promise<updatedResult | unUpdatedResult> => {
  const user = getCurrentUser();
  const shouldUpdateName = userName !== user.displayName;
  const shouldUpdateImg = userImg.length > 0;

  if (!shouldUpdateName && !shouldUpdateImg) {
    return {
      isUpdated: false,
    };
  }

  if (shouldUpdateName) {
    await user.updateProfile({
      displayName: userName,
    });
  }

  if (shouldUpdateImg) {
    const img = userImg[0];
    const fileName = getHash(img.name + getCurrentUnixtime.toString());

    const storageRef = storage().ref().child(`images/${fileName}`);

    await storageRef.put(img);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newImgPath = await storageRef.getDownloadURL();

    if (isString(newImgPath)) {
      await user.updateProfile({
        photoURL: newImgPath,
      });
    }
  }

  const updatedUser = getCurrentUser();
  return {
    isUpdated: true,
    newUserData: {
      id: updatedUser.uid,
      name: updatedUser.displayName ?? '',
      imgPath: updatedUser.photoURL ?? '',
    },
  } as const;
};
