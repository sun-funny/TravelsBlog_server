import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { CommentsService } from 'src/services/comments/comments.service';
import { Comment } from 'src/shemas/comment';
import { AuthGuard } from '@nestjs/passport';
import { CommentResponseDto } from 'src/dto/comment-dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(): Promise<CommentResponseDto[]> {
    return this.commentsService.findAll();
  }

  @Post(':login')
  @UseGuards(AuthGuard('jwt'))
  async addCommentByLogin(
    @Param('login') login: string,
    @Body() commentData: { text: string }
  ): Promise<CommentResponseDto> {
    return this.commentsService.createByLogin({
      text: commentData.text,
      login: login
    });
  }
}