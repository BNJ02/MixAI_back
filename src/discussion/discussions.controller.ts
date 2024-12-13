import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { GeminiService } from 'src/gemini/gemini.service';

@Controller('discussions')
export class DiscussionsController {
  constructor(
    private readonly discussionsService: DiscussionsService,
    private readonly geminiService: GeminiService,
  ) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: number,
    @Body() body: { history: any },
  ) {
    return this.discussionsService.create({ id: userId } as any, body.history);
  }

  @Put(':discussionId')
  async updateHistory(
    @Param('discussionId') discussionId: number,
    @Body() body: { newMessage: string },
  ) {
    // Récupérer l'historique existant
    const discussion = await this.discussionsService.findOne(discussionId);

    // Ajouter le nouveau message utilisateur
    const updatedHistory = [
      ...discussion.history,
      { role: 'user', parts: [{ text: body.newMessage }] },
    ];

    // Envoyer le message à l'API Gemini
    // const botResponse = await this.geminiService.sendMessage(body.newMessage);

    // Ajouter la réponse du modèle
    // updatedHistory.push({ role: 'model', parts: [{ text: botResponse }] });

    // Mettre à jour l'historique
    return this.discussionsService.updateHistory(discussionId, updatedHistory);
  }

  @Get(':userId')
  async findAllForUser(@Param('userId') userId: number) {
    return this.discussionsService.findAllForUser(userId);
  }
}
