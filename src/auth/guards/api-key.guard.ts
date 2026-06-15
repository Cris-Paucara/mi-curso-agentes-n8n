import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { ApiClient } from '../../entities/api-client.entity';

export type AuthenticatedRequest = Request & { apiClient: ApiClient };

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @InjectRepository(ApiClient)
    private readonly apiClientsRepository: Repository<ApiClient>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.readHeader(request, 'x-api-key');
    const apiSecret = this.readHeader(request, 'x-api-secret');

    if (!apiKey || !apiSecret) {
      throw new UnauthorizedException('Missing x-api-key or x-api-secret headers');
    }

    const client = await this.apiClientsRepository.findOne({
      where: { apiKey, isActive: true },
    });

    if (!client) {
      throw new UnauthorizedException('Invalid API credentials');
    }

    const secretMatches = await bcrypt.compare(apiSecret, client.apiSecretHash);
    if (!secretMatches) {
      throw new UnauthorizedException('Invalid API credentials');
    }

    (request as AuthenticatedRequest).apiClient = client;
    return true;
  }

  private readHeader(request: Request, name: string): string | undefined {
    const value = request.headers[name];
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  }
}