import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PromptResponseDto } from 'src/dto/prompt-response.dto';

@Injectable()
export class GeminiService {
  private genAI: any;
  private genAIModel: any;

  // constructor(private readonly config: ConfigService) {}

  async getPromptResponse(
    prompt: string,
    generative_model: string,
    API_key: string,
  ): Promise<PromptResponseDto> {
    // Access the API_key
    this.genAI = new GoogleGenerativeAI(API_key);

    // For text-only input, use the gemini-1.5-flash model
    this.genAIModel = this.genAI.getGenerativeModel({
      model: generative_model,
    });

    const result = await this.genAIModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(generative_model);
    console.log(text);

    return { response: text } as PromptResponseDto;
  }
}
