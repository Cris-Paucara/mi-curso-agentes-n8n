import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type DocumentQuery = {
<<<<<<< HEAD
    Text: string;
    Alias: string;
    TargetAlias?: string;
    Pages?: string[];
=======
  Text: string;
  Alias: string;
  TargetAlias?: string;
  Pages?: string[];
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
};

@Entity({ name: 'document_types' })
export class DocumentType {
<<<<<<< HEAD
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', unique: true })
    code: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    category: string;

    @Column({ type: 'jsonb' })
    queries: DocumentQuery[];

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
=======
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'jsonb' })
  queries: DocumentQuery[];

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
