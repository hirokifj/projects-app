export type Tag = {
  id: string;
  label: string;
};

export type TagWithoutId = Omit<Tag, 'id'>;
