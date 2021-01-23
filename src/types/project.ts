import firebase from 'firebase';

export interface Project {
  id: string;
  title: string;
  description: string;
  commentsCount: number;
  likesCount: number;
  language: Language;
  tags: string[];
  url: string;
  imgPath: string;
}

export type ProjectWithoutId = Omit<Project, 'id'>;

export type Tag = {
  id: string;
  label: string;
};

export type TagWithoutId = Omit<Tag, 'id'>;

export type Language = '日本語' | '英語';

export const projectConverter = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): ProjectWithoutId {
    /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment */
    const data = snapshot.data(options)!;

    return {
      title: data.title,
      description: data.description,
      commentsCount: data.commentsCount,
      likesCount: data.likesCount,
      language: data.language,
      tags: data.tags,
      url: data.url,
      imgPath: data.imgPath,
    };
    /* eslint-enable */
  },
};

export const tagConverter = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): TagWithoutId {
    /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment */
    const data = snapshot.data(options)!;

    return {
      label: data.label,
    };
    /* eslint-enable */
  },
};
