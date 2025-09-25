import { ApiResponse } from '@nestjs/swagger';
import { PostListResponseDoc } from './PostListResponseDoc';
import { CreatePostResponseDoc } from './CreatePostResponseDoc';
import { DeletePostResponseDoc } from './DeletePostResponseDoc';

// Responses para Posts
export const POST_RESPONSES = {
  // GET /posts - Listar todos os posts
  GET_ALL: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Lista de posts retornada com sucesso',
      type: [PostListResponseDoc],
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // POST /posts - Criar post
  CREATE: {
    SUCCESS: ApiResponse({
      status: 201,
      description: 'Post criado com sucesso',
      type: CreatePostResponseDoc,
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    BAD_REQUEST: ApiResponse({
      status: 400,
      description: 'Dados inválidos para criação do post',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // GET /posts/:id - Buscar post por ID
  GET_BY_ID: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Post encontrado com sucesso',
      type: PostListResponseDoc,
    }),
    NOT_FOUND: ApiResponse({
      status: 404,
      description: 'Post não encontrado',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // GET /posts/search - Buscar posts
  SEARCH: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Busca realizada com sucesso',
      type: [PostListResponseDoc],
    }),
    BAD_REQUEST: ApiResponse({
      status: 400,
      description: 'Termo de busca inválido',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // GET /posts/my-posts - Meus posts
  MY_POSTS: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Posts do usuário retornados com sucesso',
      type: [PostListResponseDoc],
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // GET /posts/myposts/:id - Posts por autor
  POSTS_BY_AUTHOR: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Posts do autor retornados com sucesso',
      type: [PostListResponseDoc],
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    NOT_FOUND: ApiResponse({
      status: 404,
      description: 'Autor não encontrado',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // GET /posts/my-commented - Posts comentados pelo usuário
  MY_COMMENTED: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Posts comentados pelo usuário retornados com sucesso',
      type: [PostListResponseDoc],
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // PATCH /posts/:id - Atualizar post
  UPDATE: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Post atualizado com sucesso',
      type: CreatePostResponseDoc,
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    FORBIDDEN: ApiResponse({
      status: 403,
      description: 'Usuário não tem permissão para atualizar este post',
    }),
    NOT_FOUND: ApiResponse({
      status: 404,
      description: 'Post não encontrado',
    }),
    BAD_REQUEST: ApiResponse({
      status: 400,
      description: 'Dados inválidos para atualização do post',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // DELETE /posts/:id - Deletar post
  DELETE: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Post deletado com sucesso',
      type: DeletePostResponseDoc,
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    FORBIDDEN: ApiResponse({
      status: 403,
      description: 'Usuário não tem permissão para deletar este post',
    }),
    NOT_FOUND: ApiResponse({
      status: 404,
      description: 'Post não encontrado',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },
};
