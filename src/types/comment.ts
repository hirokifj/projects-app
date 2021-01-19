export interface Comment {
  id: string;
  userId: string;
  userName: string;
  projectId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
