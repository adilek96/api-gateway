import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { PostServiceModule } from './post-service/post-service.module';
import { MediaUploadServiceModule } from './media-upload-service/media-upload-service.module';

@Module({
  imports: [
    AuthServiceModule,
    PostServiceModule,
    MediaUploadServiceModule,
  ],
  exports: [
    AuthServiceModule,
    PostServiceModule,
    MediaUploadServiceModule,
  ],
})
export class GatewayModule {} 