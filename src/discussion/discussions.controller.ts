import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { GeminiService } from 'src/gemini/gemini.service';
import { Discussion } from './discussion.entity';
import { DiscussionDto } from 'src/dto/discussion.dto';
// import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';

@Controller('discussions')
export class DiscussionsController {
  constructor(
    private readonly discussionsService: DiscussionsService,
    private readonly geminiService: GeminiService,
    private readonly usersService: UsersService,
  ) {}

  // Créer une nouvelle discussion
  @Post()
  create(
    @Body() createDiscussionDto: Partial<Discussion>,
  ): Promise<Discussion> {
    return this.discussionsService.create(
      createDiscussionDto.user,
      createDiscussionDto.history,
    );
  }

  // Continuer une discussion
  @Put()
  async updateHistory(
    @Body() body: DiscussionDto,
    @Req() request: any,
  ): Promise<Discussion> {
    const token = request.headers.authorization?.split(' ')[1];
    console.log('Token for prompt:', token);
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.usersService.findProfile(token);
    console.log('User for prompt:', user);
    console.log('GeminiAPIkey :', user.geminiAPIkey);

    // Récupérer l'historique existant
    const discussion = await this.discussionsService.findOne(body.discussionId);

    // Envoyer le message à l'API Gemini
    const AIResponse = await this.geminiService.getPromptResponseWithContext(
      body.newMessage,
      body.generative_model,
      user.geminiAPIkey,
      discussion.history,
    );

    // Afficher la réponse de l'API Gemini
    console.log('AIResponse:', AIResponse);

    // Mettre à jour l'historique
    return this.discussionsService.updateHistory(
      body.discussionId,
      discussion.history,
    );
  }

  // Récupérer toutes les discussions pour un utilisateur
  @Get('all')
  async findAllForUser(@Body() userId: any): Promise<Discussion[]> {
    return this.discussionsService.findAllForUser(userId.id);
  }

  // Supprimer une discussion
  @Get('delete')
  async remove(@Body() discussionId: any): Promise<void> {
    await this.discussionsService.remove(+discussionId.id);
  }
}
