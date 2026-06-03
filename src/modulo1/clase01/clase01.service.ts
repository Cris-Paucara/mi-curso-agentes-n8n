import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawDocumentText } from '../../entities/raw-document-text.entity';
import { TextractService } from './textract.service';

@Injectable()
export class Clase01Service {
  constructor(
    private readonly textract: TextractService,
    @InjectRepository(RawDocumentText)
    private readonly rawTextsRepository: Repository<RawDocumentText>,
  ) {}

  async extractText(body: { fileName: string }) {
    const s3Key = body.fileName;

    const result = await this.textract.detectDocumentText(s3Key);

    const saved = await this.rawTextsRepository.save(
      this.rawTextsRepository.create({
        fileName: body.fileName,
        s3Key,
        extractedText: result.text,
        lineCount: result.lineCount,
      }),
    );

    return {
      id: saved.id,
      fileName: body.fileName,
      s3Key,
      lineCount: result.lineCount,
      lines: result.lines,
    };
  }
}