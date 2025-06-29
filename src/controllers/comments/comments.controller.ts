import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from 'src/services/comments/comments.service';
import { Comment } from './comment.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addComment(
    @Request() req,
    @Body() commentData: { text: string }
  ): Promise<Comment> {
    return this.commentsService.create({
      text: commentData.text,
      userId: req.user.id
    });
  }
}