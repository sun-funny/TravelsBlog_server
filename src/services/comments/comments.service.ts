import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/controllers/comments/comment.entity';
import { User } from 'src/controllers/users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['user'] });
  }

  async create(commentData: Partial<Comment> & { userId: number }): Promise<Comment> {
    const user = await this.usersRepository.findOne({ where: { id: commentData.userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const comment = this.commentsRepository.create({
      text: commentData.text,
      date: new Date(),
      user: user
    });

    return this.commentsRepository.save(comment);
  }
}