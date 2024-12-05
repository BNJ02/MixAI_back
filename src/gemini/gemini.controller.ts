import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { PromptBody } from '../dto/prompt.dto';
import { PromptResponseDto } from 'src/dto/prompt-response.dto';
import { from, Observable } from 'rxjs';
import { UsersService } from 'src/user/users.service';

@Controller('gemini')
export class GeminiController {
  constructor(
    private readonly appService: GeminiService,
    private readonly usersService: UsersService,
  ) {}

  @Post('prompt')
  async getPromptResponse(
    @Body() body: PromptBody,
    @Req() request: any,
  ): Promise<Observable<PromptResponseDto>> {
    const token = request.headers.authorization?.split(' ')[1];
    console.log('Token for prompt:', token);
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.usersService.findProfile(token);
    console.log('User for prompt:', user);
    console.log('GeminiAPIkey :', user.geminiAPIkey);

    return from(
      this.appService.getPromptResponse(body.prompt, user.geminiAPIkey),
    );
  }
}
