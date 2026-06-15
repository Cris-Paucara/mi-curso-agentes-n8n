import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'application_documents' })
export class ApplicationDocument {
<<<<<<< HEAD
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'application_id', type: 'uuid' })
    applicationId: string;

    @Column({ name: 'document_type_code', type: 'text' })
    documentTypeCode: string;

    @Column({ name: 'file_name', type: 'text' })
    fileName: string;

    @Column({ name: 's3_key', type: 'text' })
    s3Key: string;

    @Column({ type: 'text', default: 'PENDING' })
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @Column({ name: 'processed_at', type: 'timestamptz', nullable: true })
    processedAt?: Date;
=======
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @Column({ name: 'document_type_code', type: 'text' })
  documentTypeCode: string;

  @Column({ name: 'file_name', type: 'text' })
  fileName: string;

  @Column({ name: 's3_key', type: 'text' })
  s3Key: string;

  @Column({ type: 'text', default: 'PENDING' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'processed_at', type: 'timestamptz', nullable: true })
  processedAt?: Date;
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
}