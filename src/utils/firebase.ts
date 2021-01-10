import firebase from 'firebase';

export const getFirebaseErrMsgInJP = (
  firebaseError: firebase.FirebaseError,
) => {
  let errMsg = '';

  switch (firebaseError.code) {
    case 'auth/invalid-email':
      errMsg = 'メールアドレスを正しく入力してください。';
      break;
    case 'auth/email-already-in-use':
      errMsg = 'このメールアドレスは既に利用されています。';
      break;
    case 'auth/operation-not-allowed':
      errMsg = '無効のユーザーアカウントです。';
      break;
    case 'auth/weak-password':
      errMsg = 'パスワードは6文字以上で入力してください。';
      break;
    case 'auth/user-disabled':
      errMsg = '無効のユーザーアカウントです。';
      break;
    case 'auth/user-not-found':
      errMsg = 'メールアドレス・パスワードが一致しません。';
      break;
    case 'auth/wrong-password':
      errMsg = 'メールアドレス・パスワードが一致しません。';
      break;
    case 'auth/popup-blocked':
      errMsg = 'ブラウザによってポップアップがブロックされました。';
      break;
    case 'auth/popup-closed-by-user':
      errMsg = 'ポップアップが閉じられました。';
      break;
    default:
      errMsg = '処理に失敗しました。時間をおいて再度お試しください。';
      break;
  }

  return errMsg;
};
