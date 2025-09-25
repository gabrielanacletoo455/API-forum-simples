import { ApiResponse } from '@nestjs/swagger';
import { CommentResponseDoc } from './CommentResponseDoc';
import { DeleteCommentResponseDoc } from './DeleteCommentResponseDoc';

// Responses para Comments
export const COMMENT_RESPONSES = {
  // POST /comments - Criar comentário
  CREATE: {
    SUCCESS: ApiResponse({
      status: 201,
      description: 'Comentário criado com sucesso',
      type: CommentResponseDoc,
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    BAD_REQUEST: ApiResponse({
      status: 400,
      description: 'Dados inválidos para criação do comentário',
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

  // GET /comments - Listar todos os comentários
  GET_ALL: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Lista de comentários retornada com sucesso',
      type: [CommentResponseDoc],
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // GET /comments/:id - Buscar comentário por ID
  GET_BY_ID: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Comentário encontrado com sucesso',
      type: CommentResponseDoc,
    }),
    NOT_FOUND: ApiResponse({
      status: 404,
      description: 'Comentário não encontrado',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // PATCH /comments/:id - Atualizar comentário
  UPDATE: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Comentário atualizado com sucesso',
      type: CommentResponseDoc,
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    FORBIDDEN: ApiResponse({
      status: 403,
      description: 'Usuário não tem permissão para atualizar este comentário',
    }),
    NOT_FOUND: ApiResponse({
      status: 404,
      description: 'Comentário não encontrado',
    }),
    BAD_REQUEST: ApiResponse({
      status: 400,
      description: 'Dados inválidos para atualização do comentário',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },

  // DELETE /comments/:id - Deletar comentário
  DELETE: {
    SUCCESS: ApiResponse({
      status: 200,
      description: 'Comentário deletado com sucesso',
      type: DeleteCommentResponseDoc,
    }),
    UNAUTHORIZED: ApiResponse({
      status: 401,
      description: 'Token de autenticação inválido ou expirado',
    }),
    FORBIDDEN: ApiResponse({
      status: 403,
      description: 'Usuário não tem permissão para deletar este comentário',
    }),
    NOT_FOUND: ApiResponse({
      status: 404,
      description: 'Comentário não encontrado',
    }),
    INTERNAL_ERROR: ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  },
};
