import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/shemas/comment';
import { User } from 'src/shemas/user';
import { CommentResponseDto } from 'src/dto/comment-dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(): Promise<CommentResponseDto[]> {
  const comments = await this.commentModel.find().populate('user').exec();
  return comments.map(comment => ({
    _id: comment._id.toString(),
    text: comment.text,
    date: comment.date,
    userId: comment.user._id.toString(),
    userName: comment.user.login
  }));
}

   async createByLogin(commentData: { text: string; login: string }): Promise<CommentResponseDto> {
    console.log('Creating comment with login:', commentData);
    const user = await this.userModel.findOne({ login: commentData.login }).exec();
    console.log('Found user:', user);
    
    if (!user) {
      throw new Error('User not found');
    }

    const comment = new this.commentModel({
      text: commentData.text,
      date: new Date(),
      user: user._id
    });
    
    try {
      const savedComment = await comment.save();
      console.log('Comment saved:', savedComment);
      return {
        _id: savedComment._id.toString(),
        text: savedComment.text,
        date: savedComment.date,
        userId: user._id.toString(),
        userName: user.login
      };
    } catch (error) {
      console.error('Error saving comment:', error);
      throw error;
    }
  }

  async deleteComment(id: string): Promise<{ message: string }> {
    const result = await this.commentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error('Comment not found');
    }
    return { message: 'Comment deleted successfully' };
  }

  async deleteAllComments(): Promise<{ message: string }> {
    const result = await this.commentModel.deleteMany({}).exec();
    return { message: `Deleted ${result.deletedCount} comments` };
  }
}