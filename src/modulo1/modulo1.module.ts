import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Clase01Controller } from './clase01/clase01.controller';
import { Clase01Service } from './clase01/clase01.service';
import { RawDocumentText } from '../entities/raw-document-text.entity';
import { TextractService } from './clase01/textract.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([RawDocumentText])],
  controllers: [Clase01Controller],
  providers: [Clase01Service, TextractService],
})
export class Modulo1Module {}