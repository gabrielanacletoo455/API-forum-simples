import { User } from '../../users/entities/user.entity';

export class CommentResponseDto {
  id: number;
  content: string;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    fullName: string;
    username: string;
    photoProfile: string;
  };
  postId: number;
}

