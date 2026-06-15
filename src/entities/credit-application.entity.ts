import {
<<<<<<< HEAD
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
=======
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
} from 'typeorm';

@Entity({ name: 'credit_applications' })
export class CreditApplication {
<<<<<<< HEAD
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'applicant_external_id', type: 'text', nullable: true })
    applicantExternalId?: string;

    @Column({ name: 'applicant_name', type: 'text', nullable: true })
    applicantName?: string;

    @Column({ type: 'text', default: 'DOCUMENTS_REGISTERED' })
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
=======
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'applicant_external_id', type: 'text', nullable: true })
  applicantExternalId?: string;

  @Column({ name: 'applicant_name', type: 'text', nullable: true })
  applicantName?: string;

  @Column({ type: 'text', default: 'DOCUMENTS_REGISTERED' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
}