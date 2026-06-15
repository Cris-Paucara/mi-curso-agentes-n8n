import {
<<<<<<< HEAD
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
=======
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
} from 'typeorm';

@Entity({ name: 'raw_document_texts' })
export class RawDocumentText {
<<<<<<< HEAD
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'file_name', type: 'text' })
    fileName: string;

    @Column({ name: 's3_key', type: 'text' })
    s3Key: string;

    @Column({ name: 'extracted_text', type: 'text' })
    extractedText: string;

    @Column({ name: 'line_count', type: 'int' })
    lineCount: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
=======
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'file_name', type: 'text' })
  fileName: string;

  @Column({ name: 's3_key', type: 'text' })
  s3Key: string;

  @Column({ name: 'extracted_text', type: 'text' })
  extractedText: string;

  @Column({ name: 'line_count', type: 'int' })
  lineCount: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
}