import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RolesGuards } from '../auth/guards/role-guard';
import { AuthGuard } from '../auth/guards/auth-guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CreatePostDoc } from './docs/createPost.doc';
import { POST_RESPONSES } from './docs/swagger-responses.constants';

@Controller('posts')
@ApiTags('3 - Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @ApiBody({ 
    type: CreatePostDoc,
    description: 'Dados para criação de um novo post',
    examples: {
      'Post simples': {
        summary: 'Criar post apenas com título e conteúdo',
        value: {
          title: 'Meu primeiro post',
          content: 'Este é o conteúdo do meu post'
        }
      },
      'Post com imagem': {
        summary: 'Criar post com imagem',
        value: {
          title: 'Post com imagem',
          content: 'Este post tem uma imagem',
          imageUrl: 'https://exemplo.com/minha-imagem.jpg'
        }
      }
    }
  })
  @POST_RESPONSES.CREATE.SUCCESS
  @POST_RESPONSES.CREATE.UNAUTHORIZED
  @POST_RESPONSES.CREATE.BAD_REQUEST
  @POST_RESPONSES.CREATE.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() currentUser: User
  ) {

    return this.postsService.create(createPostDto, +currentUser.id);
  }

  @POST_RESPONSES.GET_ALL.SUCCESS
  @POST_RESPONSES.GET_ALL.INTERNAL_ERROR
  @Get()
  findAll() {
    return this.postsService.findAll();
  }


  @POST_RESPONSES.SEARCH.SUCCESS
  @POST_RESPONSES.SEARCH.BAD_REQUEST
  @POST_RESPONSES.SEARCH.INTERNAL_ERROR
  @Get('search')
  searchPosts(@Query('q') searchTerm: string) {
  
    return this.postsService.searchPosts(searchTerm);
  }

  
  @ApiBearerAuth()
  @POST_RESPONSES.MY_POSTS.SUCCESS
  @POST_RESPONSES.MY_POSTS.UNAUTHORIZED
  @POST_RESPONSES.MY_POSTS.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Get('my-posts')
  findAllMyPosts(@CurrentUser() currentUser: User) {
    return this.postsService.findAllMyPosts(+currentUser.id);
  }

  @ApiBearerAuth()
  @POST_RESPONSES.POSTS_BY_AUTHOR.SUCCESS
  @POST_RESPONSES.POSTS_BY_AUTHOR.UNAUTHORIZED
  @POST_RESPONSES.POSTS_BY_AUTHOR.NOT_FOUND
  @POST_RESPONSES.POSTS_BY_AUTHOR.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Get('myposts/:id')
  findAllPostsByAuthorId(@Param('id') id: string) {
    return this.postsService.findAllPostsByAuthorId(+id);
  }

  @ApiBearerAuth()
  @POST_RESPONSES.MY_COMMENTED.SUCCESS
  @POST_RESPONSES.MY_COMMENTED.UNAUTHORIZED
  @POST_RESPONSES.MY_COMMENTED.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Get('my-commented/:id')
  findAllPostsICommented(@Param('id') id: string) {
    return this.postsService.findPostsCommentedByUser(+id);
  }



  @ApiExcludeEndpoint()
  @POST_RESPONSES.GET_BY_ID.SUCCESS
  @POST_RESPONSES.GET_BY_ID.NOT_FOUND
  @POST_RESPONSES.GET_BY_ID.INTERNAL_ERROR
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiBearerAuth()
  @POST_RESPONSES.UPDATE.SUCCESS
  @POST_RESPONSES.UPDATE.UNAUTHORIZED
  @POST_RESPONSES.UPDATE.FORBIDDEN
  @POST_RESPONSES.UPDATE.NOT_FOUND
  @POST_RESPONSES.UPDATE.BAD_REQUEST
  @POST_RESPONSES.UPDATE.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() currentUser: User
  ) {
    return this.postsService.update(+id, updatePostDto, +currentUser.id);
  }


  @ApiBearerAuth()
  @POST_RESPONSES.DELETE.SUCCESS
  @POST_RESPONSES.DELETE.UNAUTHORIZED
  @POST_RESPONSES.DELETE.FORBIDDEN
  @POST_RESPONSES.DELETE.NOT_FOUND
  @POST_RESPONSES.DELETE.INTERNAL_ERROR
  @UseGuards(AuthGuard, RolesGuards)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: User
  ) {
    return this.postsService.remove(+id, +currentUser.id, currentUser.role);
  }
}
