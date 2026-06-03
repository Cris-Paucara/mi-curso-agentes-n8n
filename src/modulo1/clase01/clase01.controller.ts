import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';

@Controller('modulo1/clase01')
export class Clase01Controller {
  @Get('test')
  @UseGuards(ApiKeyGuard)
  testAuthenticated(): string {
    return 'endpoint test autenticado';
  }
}