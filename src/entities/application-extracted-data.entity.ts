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

@Entity({ name: 'application_extracted_data' })
export class ApplicationExtractedData {
<<<<<<< HEAD
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'application_id', type: 'uuid', unique: true })
    applicationId: string;

    @Column({ name: 'personal_data', type: 'jsonb', default: {} })
    personalData: Record<string, unknown>;

    @Column({ name: 'employment_data', type: 'jsonb', default: {} })
    employmentData: Record<string, unknown>;

    @Column({ name: 'income_data', type: 'jsonb', default: {} })
    incomeData: Record<string, unknown>;

    @Column({ name: 'banking_data', type: 'jsonb', default: {} })
    bankingData: Record<string, unknown>;

    @Column({ name: 'loan_request_data', type: 'jsonb', default: {} })
    loanRequestData: Record<string, unknown>;

    @Column({ name: 'credit_history_data', type: 'jsonb', default: {} })
    creditHistoryData: Record<string, unknown>;

    @Column({ name: 'confidence_summary', type: 'jsonb', default: {} })
    confidenceSummary: Record<string, unknown>;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
=======
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid', unique: true })
  applicationId: string;

  @Column({ name: 'personal_data', type: 'jsonb', default: {} })
  personalData: Record<string, unknown>;

  @Column({ name: 'employment_data', type: 'jsonb', default: {} })
  employmentData: Record<string, unknown>;

  @Column({ name: 'income_data', type: 'jsonb', default: {} })
  incomeData: Record<string, unknown>;

  @Column({ name: 'banking_data', type: 'jsonb', default: {} })
  bankingData: Record<string, unknown>;

  @Column({ name: 'loan_request_data', type: 'jsonb', default: {} })
  loanRequestData: Record<string, unknown>;

  @Column({ name: 'credit_history_data', type: 'jsonb', default: {} })
  creditHistoryData: Record<string, unknown>;

  @Column({ name: 'confidence_summary', type: 'jsonb', default: {} })
  confidenceSummary: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
}