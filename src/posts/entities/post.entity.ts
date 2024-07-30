import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: number;
  authorId: number;
  published: boolean;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
