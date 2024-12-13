import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discussion } from './discussion.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(Discussion)
    private readonly discussionRepository: Repository<Discussion>,
  ) {}

  async create(user: User, history: any): Promise<Discussion> {
    const discussion = this.discussionRepository.create({ user, history });
    return this.discussionRepository.save(discussion);
  }

  async findOne(discussionId: number): Promise<Discussion> {
    return this.discussionRepository.findOne({
      where: { id: discussionId },
    });
  }

  async findAllForUser(userId: number): Promise<Discussion[]> {
    return this.discussionRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async updateHistory(
    discussionId: number,
    newHistory: any,
  ): Promise<Discussion> {
    const discussion = await this.discussionRepository.findOne({
      where: { id: discussionId },
    });
    if (!discussion) {
      throw new Error('Discussion not found');
    }

    discussion.history = newHistory;
    return this.discussionRepository.save(discussion);
  }
}
