import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { Clase01Service } from './clase01.service';

@Controller('modulo1/clase01')
@UseGuards(ApiKeyGuard) // protege TODO el controller (recomendado en el curso)
export class Clase01Controller {
  constructor(private readonly clase01: Clase01Service) {}

  @Get('test')
  testAuthenticated(): string {
    return 'endpoint test autenticado';
  }

  @Post('textract/text')
  async extractText(@Body() body: { fileName: string }) {
    return await this.clase01.extractText(body);
  }
}