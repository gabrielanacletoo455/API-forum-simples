import { BadRequestException } from '@nestjs/common';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../../enums/role.enum';
import { Post } from '@/posts/entities/post.entity';
import { Comment } from '@/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  userName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instagram: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkedin: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  whatsapp: string;

  @Column({ 
    type: 'enum',
    enum: ['male', 'female', 'other', 'prefer_not_to_say'],
    nullable: true 
  })
  gender: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  photoProfile: string;

  @Column({ type: 'text', nullable: true })
  bioDescription: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 64, nullable: false, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    nullable: false,
    default: RoleEnum.client,
  })
  role: RoleEnum;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  
  // Relação One-to-Many com Post
  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  // Relação One-to-Many com Comment
  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  // Relação Many-to-Many auto-referencial para Friends
  @ManyToMany(() => User, user => user.friends)
  @JoinTable({
    name: 'user_friends', // Nome da tabela de junção
    joinColumn: {
      name: 'user_id', // Nome da coluna que referencia o usuário atual
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'friend_id', // Nome da coluna que referencia o amigo
      referencedColumnName: 'id'
    }
  })
  friends: User[];

  // Relação para solicitações de amizade ENVIADAS
  @ManyToMany(() => User, user => user.receivedFriendRequests)
  @JoinTable({
    name: 'friend_requests', // Tabela de solicitações
    joinColumn: {
      name: 'sender_id', // Quem enviou a solicitação
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'receiver_id', // Quem recebeu a solicitação
      referencedColumnName: 'id'
    }
  })
  sentFriendRequests: User[];

  // Relação para solicitações de amizade RECEBIDAS
  @ManyToMany(() => User, user => user.sentFriendRequests)
  receivedFriendRequests: User[];


  @BeforeInsert()
  @BeforeUpdate()
  async passwordHash(): Promise<void> {
    // Só faz hash se a senha foi modificada
    if (this.password && !this.password.startsWith('$2b$')) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new BadRequestException('Erro ao processar senha.');
      }
    }
  }
}
