import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MediaUploadServiceResolver } from './media-upload-service.resolver';
import { MediaUploadServiceService } from './media-upload-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [MediaUploadServiceResolver, MediaUploadServiceService],
  exports: [MediaUploadServiceService],
})
export class MediaUploadServiceModule {} 