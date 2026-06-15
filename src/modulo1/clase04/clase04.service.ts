import {
<<<<<<< HEAD
    BadRequestException,
    Injectable,
    NotFoundException,
=======
  BadRequestException,
  Injectable,
  NotFoundException,
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationExtractedData } from '../../entities/application-extracted-data.entity';
import { CleanCreditProfile } from '../../entities/clean-credit-profile.entity';
import { GlueJobRunEntity } from '../../entities/glue-job-run.entity';
import { Clase03Service } from '../clase03/clase03.service';
import { GlueService } from './glue.service';

type CreateAndCleanCreditFileBody = {
<<<<<<< HEAD
    applicantExternalId?: string;
    applicantName?: string;
    documents: {
        documentType: string;
        fileName: string;
    }[];
=======
  applicantExternalId?: string;
  applicantName?: string;
  documents: {
    documentType: string;
    fileName: string;
  }[];
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
};

@Injectable()
export class Clase04Service {
<<<<<<< HEAD
    private readonly glueS3: S3Client;

    constructor(
        private readonly config: ConfigService,
        private readonly glue: GlueService,
        private readonly clase03: Clase03Service,
        @InjectRepository(ApplicationExtractedData)
        private readonly extractedData: Repository<ApplicationExtractedData>,
        @InjectRepository(CleanCreditProfile)
        private readonly cleanProfiles: Repository<CleanCreditProfile>,
        @InjectRepository(GlueJobRunEntity)
        private readonly glueRuns: Repository<GlueJobRunEntity>,
    ) {
        this.glueS3 = new S3Client({
            region: this.config.getOrThrow<string>('AWS_GLUE_REGION'),
            credentials: {
                accessKeyId: this.config.getOrThrow<string>('GLUE_AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.config.getOrThrow<string>(
                    'GLUE_AWS_SECRET_ACCESS_KEY',
                ),
            },
        });
    }

    async createProcessAndCleanCreditFile(body: CreateAndCleanCreditFileBody) {
        const creditFile = await this.clase03.createCreditFile(body);
        await this.clase03.processCreditFile(creditFile.applicationId);
        const cleanJob = await this.cleanCreditFile({
            applicationId: creditFile.applicationId,
        });

        return {
            applicationId: creditFile.applicationId,
            textractStatus: 'TEXTRACT_COMPLETED',
            cleanJob,
        };
    }

    async cleanCreditFile(body: { applicationId: string }) {
        const extracted = await this.extractedData.findOne({
            where: { applicationId: body.applicationId },
        });

        if (!extracted) {
            throw new BadRequestException('Run Clase 3 before cleaning this file');
        }

        const inputKey = this.stagingKey(
            body.applicationId,
            'extracted-data.json',
        );
        const outputKey = this.stagingKey(body.applicationId, 'clean-profile.json');

        await this.uploadStagingJson(inputKey, {
            personalData: extracted.personalData,
            employmentData: extracted.employmentData,
            incomeData: extracted.incomeData,
            bankingData: extracted.bankingData,
            loanRequestData: extracted.loanRequestData,
            creditHistoryData: extracted.creditHistoryData,
            confidenceSummary: extracted.confidenceSummary,
        });

        const job = await this.glue.startCleanJob({
            applicationId: body.applicationId,
            inputKey,
            outputKey,
        });

        const run = await this.glueRuns.save(
            this.glueRuns.create({
                applicationId: body.applicationId,
                jobName: job.jobName,
                jobRunId: job.jobRunId,
                jobType: 'CLEAN_CREDIT_FILE',
                status: 'STARTING',
                inputPath: inputKey,
                outputPath: outputKey,
            }),
        );

        return {
            applicationId: body.applicationId,
            jobRunId: run.jobRunId,
            status: run.status,
            stagingBucket: this.config.getOrThrow<string>('AWS_GLUE_STAGING_BUCKET'),
            inputKey,
            outputKey,
        };
    }

    async getCleanStatus(applicationId: string) {
        const run = await this.glueRuns.findOne({
            where: { applicationId, jobType: 'CLEAN_CREDIT_FILE' },
            order: { createdAt: 'DESC' },
        });

        if (!run) {
            throw new NotFoundException('No clean job found for this application');
        }

        const status = await this.glue.getJobStatus(run.jobName, run.jobRunId);
        await this.glueRuns.update(run.id, { status });

        if (status === 'SUCCEEDED') {
            await this.importCleanProfile(applicationId, run.outputPath!);
        }

        const profile = await this.cleanProfiles.findOne({ where: { applicationId } });

        return {
            applicationId,
            jobRunId: run.jobRunId,
            status,
            cleanProfile: profile,
        };
    }

    private stagingKey(applicationId: string, fileName: string) {
        const prefix = this.config.getOrThrow<string>('AWS_GLUE_STAGING_PREFIX');
        return `${prefix}/${applicationId}/${fileName}`;
    }

    private async uploadStagingJson(key: string, data: unknown) {
        await this.glueS3.send(
            new PutObjectCommand({
                Bucket: this.config.getOrThrow<string>('AWS_GLUE_STAGING_BUCKET'),
                Key: key,
                Body: JSON.stringify(data),
                ContentType: 'application/json',
            }),
        );
    }

    private async importCleanProfile(applicationId: string, key: string) {
        const response = await this.glueS3.send(
            new GetObjectCommand({
                Bucket: this.config.getOrThrow<string>('AWS_GLUE_STAGING_BUCKET'),
                Key: key,
            }),
        );

        const text = await response.Body!.transformToString();
        const payload = JSON.parse(text);
        const clean = payload.clean;

        const existing = await this.cleanProfiles.findOne({ where: { applicationId } });

        await this.cleanProfiles.save(
            this.cleanProfiles.create({
                ...(existing ?? {}),
                applicationId,
                applicantName: clean.applicant_name,
                identityNumber: clean.identity_number,
                birthDate: clean.birth_date,
                employerName: clean.employer_name,
                jobTitle: clean.job_title,
                employmentTenureMonths: clean.employment_tenure_months,
                netMonthlyIncome: clean.net_monthly_income,
                grossMonthlyIncome: clean.gross_monthly_income,
                averageMonthlyBalance: clean.average_monthly_balance,
                requestedAmount: clean.requested_amount,
                requestedTermMonths: clean.requested_term_months,
                propertyValue: clean.property_value,
                reportedTotalDebt: clean.reported_total_debt,
                monthlyDebtPayment: clean.monthly_debt_payment,
                activeLoanCount: clean.active_loan_count,
                hasLatePayments: clean.has_late_payments,
                estimatedMonthlyPayment: clean.estimated_monthly_payment,
                initialDebtToIncomeRatio: clean.initial_debt_to_income_ratio,
                cleanPayload: clean,
                qualityReport: payload.quality_report,
            }),
        );
    }
}
=======
  private readonly s3: S3Client;

  constructor(
    private readonly config: ConfigService,
    private readonly glue: GlueService,
    private readonly clase03: Clase03Service,
    @InjectRepository(ApplicationExtractedData)
    private readonly extractedData: Repository<ApplicationExtractedData>,
    @InjectRepository(CleanCreditProfile)
    private readonly cleanProfiles: Repository<CleanCreditProfile>,
    @InjectRepository(GlueJobRunEntity)
    private readonly glueRuns: Repository<GlueJobRunEntity>,
  ) {
    this.s3 = new S3Client({
      region: this.config.getOrThrow<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.config.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async createProcessAndCleanCreditFile(body: CreateAndCleanCreditFileBody) {
    const creditFile = await this.clase03.createCreditFile(body);
    await this.clase03.processCreditFile(creditFile.applicationId);
    const cleanJob = await this.cleanCreditFile({
      applicationId: creditFile.applicationId,
    });

    return {
      applicationId: creditFile.applicationId,
      textractStatus: 'TEXTRACT_COMPLETED',
      cleanJob,
    };
  }

  async cleanCreditFile(body: { applicationId: string }) {
    const extracted = await this.extractedData.findOne({
      where: { applicationId: body.applicationId },
    });

    if (!extracted) {
      throw new BadRequestException('Run Clase 3 before cleaning this file');
    }

    const inputKey = this.objectKey(body.applicationId, 'extracted-data.json');
    const outputKey = this.objectKey(body.applicationId, 'clean-profile.json');

    await this.uploadJson(inputKey, {
      personalData: extracted.personalData,
      employmentData: extracted.employmentData,
      incomeData: extracted.incomeData,
      bankingData: extracted.bankingData,
      loanRequestData: extracted.loanRequestData,
      creditHistoryData: extracted.creditHistoryData,
      confidenceSummary: extracted.confidenceSummary,
    });

    const job = await this.glue.startCleanJob({
      applicationId: body.applicationId,
      inputKey,
      outputKey,
    });

    const run = await this.glueRuns.save(
      this.glueRuns.create({
        applicationId: body.applicationId,
        jobName: job.jobName,
        jobRunId: job.jobRunId,
        jobType: 'CLEAN_CREDIT_FILE',
        status: 'STARTING',
        inputPath: inputKey,
        outputPath: outputKey,
      }),
    );

    return {
      applicationId: body.applicationId,
      jobRunId: run.jobRunId,
      status: run.status,
      bucket: this.config.getOrThrow<string>('AWS_S3_BUCKET'),
      inputKey,
      outputKey,
    };
  }

  async getCleanStatus(applicationId: string) {
    const run = await this.glueRuns.findOne({
      where: { applicationId, jobType: 'CLEAN_CREDIT_FILE' },
      order: { createdAt: 'DESC' },
    });

    if (!run) {
      throw new NotFoundException('No clean job found for this application');
    }

    const status = await this.glue.getJobStatus(run.jobName, run.jobRunId);
    await this.glueRuns.update(run.id, { status });

    if (status === 'SUCCEEDED') {
      await this.importCleanProfile(applicationId, run.outputPath!);
    }

    const profile = await this.cleanProfiles.findOne({ where: { applicationId } });

    return {
      applicationId,
      jobRunId: run.jobRunId,
      status,
      cleanProfile: profile,
    };
  }

  private objectKey(applicationId: string, fileName: string) {
    const prefix = this.config.getOrThrow<string>('AWS_S3_CLEAN_PREFIX');
    return `${prefix}/${applicationId}/${fileName}`;
  }

  private async uploadJson(key: string, data: unknown) {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.config.getOrThrow<string>('AWS_S3_BUCKET'),
        Key: key,
        Body: JSON.stringify(data),
        ContentType: 'application/json',
      }),
    );
  }

  private async importCleanProfile(applicationId: string, key: string) {
    const response = await this.s3.send(
      new GetObjectCommand({
        Bucket: this.config.getOrThrow<string>('AWS_S3_BUCKET'),
        Key: key,
      }),
    );

    const text = await response.Body!.transformToString();
    const payload = JSON.parse(text);
    const clean = payload.clean;

    const existing = await this.cleanProfiles.findOne({ where: { applicationId } });

    await this.cleanProfiles.save(
      this.cleanProfiles.create({
        ...(existing ?? {}),
        applicationId,
        applicantName: clean.applicant_name,
        identityNumber: clean.identity_number,
        birthDate: clean.birth_date,
        employerName: clean.employer_name,
        jobTitle: clean.job_title,
        employmentTenureMonths: clean.employment_tenure_months,
        netMonthlyIncome: clean.net_monthly_income,
        grossMonthlyIncome: clean.gross_monthly_income,
        averageMonthlyBalance: clean.average_monthly_balance,
        requestedAmount: clean.requested_amount,
        requestedTermMonths: clean.requested_term_months,
        propertyValue: clean.property_value,
        reportedTotalDebt: clean.reported_total_debt,
        monthlyDebtPayment: clean.monthly_debt_payment,
        activeLoanCount: clean.active_loan_count,
        hasLatePayments: clean.has_late_payments,
        estimatedMonthlyPayment: clean.estimated_monthly_payment,
        initialDebtToIncomeRatio: clean.initial_debt_to_income_ratio,
        cleanPayload: clean,
        qualityReport: payload.quality_report,
      }),
    );
  }
}
>>>>>>> a7a0c360692570d596842b4048b0ac4da52f8fff
