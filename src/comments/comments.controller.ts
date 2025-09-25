import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@/auth/guards/auth-guard';
import { RolesGuards } from '@/auth/guards/role-guard';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { User } from '@/users/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCommentDoc } from './docs/CreateCommentDoc';
import { COMMENT_RESPONSES } from './docs/swagger-responses.constants';

@Controller('comments')
@ApiTags('4 - Comentários')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @ApiBody({
    type: CreateCommentDoc,
    description: 'Dados para criação de um novo comentário',
    examples: {
      'Comentário simples': {
        summary: 'Criar comentário em um post',
        value: {
          content: 'Excelente post! Muito informativo.',
          postId: 10
        }
      }
    }
  })
  @COMMENT_RESPONSES.CREATE.SUCCESS
  @COMMENT_RESPONSES.CREATE.UNAUTHORIZED
  @COMMENT_RESPONSES.CREATE.BAD_REQUEST
  @COMMENT_RESPONSES.CREATE.NOT_FOUND
  @COMMENT_RESPONSES.CREATE.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.commentsService.create(createCommentDto, +currentUser.id);
  }

  @COMMENT_RESPONSES.GET_ALL.SUCCESS
  @COMMENT_RESPONSES.GET_ALL.INTERNAL_ERROR
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @COMMENT_RESPONSES.GET_BY_ID.SUCCESS
  @COMMENT_RESPONSES.GET_BY_ID.NOT_FOUND
  @COMMENT_RESPONSES.GET_BY_ID.INTERNAL_ERROR
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @ApiBearerAuth()
  @COMMENT_RESPONSES.UPDATE.SUCCESS
  @COMMENT_RESPONSES.UPDATE.UNAUTHORIZED
  @COMMENT_RESPONSES.UPDATE.FORBIDDEN
  @COMMENT_RESPONSES.UPDATE.NOT_FOUND
  @COMMENT_RESPONSES.UPDATE.BAD_REQUEST
  @COMMENT_RESPONSES.UPDATE.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() currentUser: User
  ) {
    return this.commentsService.update(+id, updateCommentDto, +currentUser.id, currentUser.role);
  }

  @ApiBearerAuth()
  @COMMENT_RESPONSES.DELETE.SUCCESS
  @COMMENT_RESPONSES.DELETE.UNAUTHORIZED
  @COMMENT_RESPONSES.DELETE.FORBIDDEN
  @COMMENT_RESPONSES.DELETE.NOT_FOUND
  @COMMENT_RESPONSES.DELETE.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: User
  ) {
    return this.commentsService.remove(+id, +currentUser.id, currentUser.role);
  }
}
