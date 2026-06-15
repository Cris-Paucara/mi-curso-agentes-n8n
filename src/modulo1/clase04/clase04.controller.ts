import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { Clase04Service } from './clase04.service';

@Controller('modulo1/clase04')
@UseGuards(ApiKeyGuard)
export class Clase04Controller {
<<<<<<< HEAD
    constructor(private readonly clase04: Clase04Service) { }

    @Post('credit-files')
    async createProcessAndCleanCreditFile(
        @Body()
        body: {
            applicantExternalId?: string;
            applicantName?: string;
            documents: { documentType: string; fileName: string }[];
        },
    ) {
        return await this.clase04.createProcessAndCleanCreditFile(body);
    }

    @Post('credit-files/clean')
    async cleanCreditFile(@Body() body: { applicationId: string }) {
        return await this.clase04.cleanCreditFile(body);
    }

    @Get('credit-files/:applicationId/clean-status')
    async getCleanStatus(@Param('applicationId') applicationId: string) {
        return await this.clase04.getCleanStatus(applicationId);
    }
=======
  constructor(private readonly clase04: Clase04Service) {}

  @Post('credit-files')
  async createProcessAndCleanCreditFile(
    @Body()
    body: {
      applicantExternalId?: string;
      applicantName?: string;
      documents: { documentType: string; fileName: string }[];
    },
  ) {
    return await this.clase04.createProcessAndCleanCreditFile(body);
  }

  @Post('credit-files/clean')
  async cleanCreditFile(@Body() body: { applicationId: string }) {
    return await this.clase04.cleanCreditFile(body);
  }

  @Get('credit-files/:applicationId/clean-status')
  async getCleanStatus(@Param('applicationId') applicationId: string) {
    return await this.clase04.getCleanStatus(applicationId);
  }
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
}