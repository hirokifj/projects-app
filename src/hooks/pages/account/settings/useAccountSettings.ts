import { useToast } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { updateUserName, updateUserImg } from '@/api/user';
import { AccountSettingsFormValue } from '@/components/user/AccountSettingForm';
import { useRouter } from 'next/router';

export const useAccountSettings = () => {
  const { refreshUser, redirectIfUnAuthorized, user } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const updateUser = ({
    userName,
    userImg,
  }: // eslint-disable-next-line consistent-return
  AccountSettingsFormValue): Promise<void> | undefined => {
    const promises = [];

    if (user && userName !== user.name) {
      promises.push(updateUserName(userName));
    }
    if (userImg.length > 0) {
      promises.push(updateUserImg(userImg[0]));
    }

    if (promises.length > 0) {
      return Promise.all(promises)
        .then(() => {
          refreshUser();
          router.push('/account');

          toast({
            title: '',
            description: 'ユーザー情報を更新しました。',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: 'エラー',
            description: '時間をおいて、再度お試しください。',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  return {
    user,
    redirectIfUnAuthorized,
    updateUser,
  } as const;
};
