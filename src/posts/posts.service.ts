import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ILike, Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) 
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}
  
  async create(createPostDto: CreatePostDto, authorId: number) {
    try {
      // 1. Busca o usuário autor
      const author = await this.usersRepository.findOne({
        where: { id: authorId }
      });

      if (!author) {
        throw new HttpException('Autor não encontrado', 404);
      }

      // 2. Cria o post com o autor
      const newPost = this.postsRepository.create({
        ...createPostDto,
        author: author // 🎯 Atribui o autor ao post
      });

      // 3. Salva o post no banco
      const savedPost = await this.postsRepository.save(newPost);

      return savedPost;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

 async findAll() {
    try {
      return await this.postsRepository.find({
        order: {
          createdAt: 'DESC' 
        },
        relations: ['author', 'comments'] 
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async searchPosts(searchTerm: string) {
    try {
     
      // 1. Validação do searchTerm
      if (!searchTerm || searchTerm.trim() === '') {
        return [];
      }
  
      const results = await this.postsRepository.find({
        where: { 
          title: ILike(`%${searchTerm}%`) 
        },
        relations: ['author', 'comments'],
      });
      
      return results;
    } catch (error) {
      console.error('Erro na busca:', error);
      throw new HttpException(error.message, error.status);
    }
  }


  async findAllMyPosts(authorId: number) {
    try {
      return await this.postsRepository.find({ where: { authorId }, relations: ['author', 'comments'] });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllPostsByAuthorId(id: number) {;
    try {
      return await this.postsRepository.find({ 
        where: { authorId: id }, 
        relations: ['author', 'comments'] 
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findPostsCommentedByUser(userId: number) {
    try {
      return await this.postsRepository.find({
        where: { comments: { authorId: userId } },
        relations: ['author', 'comments', 'comments.author'],
        order: { createdAt: 'DESC' },
        withDeleted: false,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

 async findOne(id: number) {
    try {
      return await this.postsRepository.findOne({ where: { id }, relations: ['author', 'comments', 'comments.author'] });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto, currentUserId: number) {
    try {
      // 1. Busca o post pelo ID
      const post = await this.postsRepository.findOne({
        where: { id },
        relations: ['author']
      });

      if (!post) {
        throw new HttpException('Post não encontrado', 404);
      }

      // 2. Verifica se o usuário atual é o autor do post
      if (post.authorId !== currentUserId) {
        throw new HttpException('Você não tem permissão para editar este post', 403);
      }

      // 3. Atualiza apenas os campos fornecidos
      const updatedPost = await this.postsRepository.save({
        ...post,
        ...updatePostDto,
        updatedAt: new Date()
      });

      // 4. Retorna o post atualizado com as relações
      return await this.postsRepository.findOne({
        where: { id },
        relations: ['author', 'comments']
      });

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro interno do servidor', 500);
    }
  }

  async remove(id: number, currentUserId: number, currentUserRole: string) {
    try {
      // 1. Busca o post pelo ID
      const post = await this.postsRepository.findOne({
        where: { id },
        relations: ['author']
      });

      if (!post) {
        throw new HttpException('Post não encontrado', 404);
      }

      // 2. Verifica permissões de exclusão
      const isOwner = post.authorId === currentUserId;
      const isAdmin = currentUserRole === 'admin';

      if (!isOwner && !isAdmin) {
        throw new HttpException('Você não tem permissão para excluir este post', 403);
      }

      // 3. Realiza soft delete (marca como deletado)
      await this.postsRepository.softDelete(id);

      // 4. Retorna confirmação de exclusão
      return {
        message: 'Post excluído com sucesso',
        deletedPost: {
          id: post.id,
          title: post.title,
          deletedBy: isAdmin ? 'admin' : 'owner',
          deletedAt: new Date()
        }
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro interno do servidor', 500);
    }
  }
}
