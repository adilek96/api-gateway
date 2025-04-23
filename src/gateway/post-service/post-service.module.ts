import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostServiceResolver } from './post-service.resolver';
import { PostServiceService } from './post-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [PostServiceResolver, PostServiceService],
  exports: [PostServiceService],
})
export class PostServiceModule {} 