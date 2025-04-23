import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MediaUploadServiceService } from './media-upload-service.service';
import { MediaResponse, Media, MediaListResponse } from '../types/media.types';

@Resolver()
export class MediaUploadServiceResolver {
  constructor(private readonly mediaService: MediaUploadServiceService) {}

  // Резолвер для GraphQL API предоставляет доступ к REST API медиа-сервиса
  // Клиентам следует использовать REST API напрямую для загрузки файлов
  // Эти методы служат только для получения информации и управления медиа
  
  @Query(() => String)
  async getMediaServiceUrl() {
    return this.mediaService.getMediaServiceUrl() + '/media';
  }
  
  @Query(() => MediaResponse)
  async getMediaById(@Args('id') id: string) {
    return { media: await this.mediaService.getMediaById(id) };
  }

  @Mutation(() => Boolean)
  async deleteMedia(
    @Args('id') id: string,
    @Args('userId') userId: string,
  ) {
    return this.mediaService.deleteMedia(id, userId);
  }
} 