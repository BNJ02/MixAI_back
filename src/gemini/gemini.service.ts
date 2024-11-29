import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromptResponseDto } from 'src/dto/prompt-response.dto';

@Injectable()
export class GeminiService {
  private genAI: any;
  private genAIModel: any;
  constructor(private readonly config: ConfigService) {
    // Access the API_KEY from the .env file
    this.genAI = new GoogleGenerativeAI(this.config.get('API_KEY'));

    // For text-only input, use the gemini-1.5-flash model
    this.genAIModel = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
  }

  async getPromptResponse(prompt: string): Promise<PromptResponseDto> {
    const result = await this.genAIModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    return { response: text } as PromptResponseDto;
  }
}
