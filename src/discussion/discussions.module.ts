import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from './discussion.entity';
import { DiscussionsController } from './discussions.controller';
import { DiscussionsService } from './discussions.service';
import { GeminiModule } from 'src/gemini/gemini.module';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Discussion]), GeminiModule, UsersModule],
  controllers: [DiscussionsController],
  providers: [DiscussionsService],
  exports: [DiscussionsService],
})
export class DiscussionModule {}
