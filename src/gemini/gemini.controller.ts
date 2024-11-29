import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { PromptBody } from '../dto/prompt.dto';
import { PromptResponseDto } from 'src/dto/prompt-response.dto';
import { from, Observable } from 'rxjs';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly appService: GeminiService) {}

  @Post('prompt')
  getPromptResponse(@Body() body: PromptBody): Observable<PromptResponseDto> {
    return from(this.appService.getPromptResponse(body.prompt));
  }
}
