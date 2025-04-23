import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthServiceResolver } from './auth-service.resolver';
import { AuthServiceService } from './auth-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [AuthServiceResolver, AuthServiceService],
  exports: [AuthServiceService],
})
export class AuthServiceModule {} 