import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'azerty',
      database: 'mixai',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    GeminiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
