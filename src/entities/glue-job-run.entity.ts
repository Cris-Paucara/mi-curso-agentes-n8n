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

@Entity({ name: 'glue_job_runs' })
export class GlueJobRunEntity {
<<<<<<< HEAD
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'application_id', type: 'uuid' })
    applicationId: string;

    @Column({ name: 'job_name', type: 'text' })
    jobName: string;

    @Column({ name: 'job_run_id', type: 'text' })
    jobRunId: string;

    @Column({ name: 'job_type', type: 'text' })
    jobType: string;

    @Column({ type: 'text', default: 'STARTING' })
    status: string;

    @Column({ name: 'input_path', type: 'text', nullable: true })
    inputPath?: string;

    @Column({ name: 'output_path', type: 'text', nullable: true })
    outputPath?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
=======
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @Column({ name: 'job_name', type: 'text' })
  jobName: string;

  @Column({ name: 'job_run_id', type: 'text' })
  jobRunId: string;

  @Column({ name: 'job_type', type: 'text' })
  jobType: string;

  @Column({ type: 'text', default: 'STARTING' })
  status: string;

  @Column({ name: 'input_path', type: 'text', nullable: true })
  inputPath?: string;

  @Column({ name: 'output_path', type: 'text', nullable: true })
  outputPath?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
}