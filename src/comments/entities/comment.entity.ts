import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '@/users/entities/user.entity';
  import { Post } from '@/posts/entities/post.entity';
  
  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    content: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    // Relação Many-to-One com User (autor do comentário)
    @ManyToOne(() => User, user => user.comments, { 
      onDelete: 'CASCADE',
      nullable: false 
    })
    @JoinColumn({ name: 'authorId' })
    author: User;
  
    @Column()
    authorId: number;
  
    // Relação Many-to-One com Post
    @ManyToOne(() => Post, post => post.comments, { 
      onDelete: 'CASCADE',
      nullable: false 
    })
    @JoinColumn({ name: 'postId' })
    post: Post;
  
    @Column()
    postId: number;
  }
  