import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { Clase01Controller } from './clase01/clase01.controller';

@Module({
  imports: [AuthModule],
  controllers: [Clase01Controller],
})
export class Modulo1Module {}