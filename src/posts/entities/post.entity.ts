import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { Comment } from '@/comments/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;


  @CreateDateColumn({ 
    type: 'timestamp', 
    precision: 3, 
    default: () => 'CURRENT_TIMESTAMP(3)' 
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // Relação Many-to-One com User
  @ManyToOne(() => User, user => user.posts, { 
    onDelete: 'CASCADE',
    nullable: false 
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  
  @Column()
  authorId: number;
  
  // Relação One-to-Many com Comment
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}
