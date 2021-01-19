export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImgPath: string;
  projectId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
