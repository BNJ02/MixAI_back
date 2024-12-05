import { Module } from '@nestjs/common';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [GeminiController],
  providers: [GeminiService],
})
export class GeminiModule {}
