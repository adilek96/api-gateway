import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MediaUploadServiceService {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const host = this.configService.get('MEDIA_UPLOAD_SERVICE_HOST', '192.168.100.45');
    const port = this.configService.get('MEDIA_UPLOAD_SERVICE_PORT', 4003);
    this.baseUrl = `http://${host}:${port}`;
  }

  // Метод для получения URL медиа-сервиса
  getMediaServiceUrl() {
    return this.baseUrl;
  }

  async getMediaById(id: string) {
    // В документации по медиа сервису не упоминается эндпоинт для получения медиа по ID,
    // но мы предполагаем, что такой эндпоинт существует
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/media/${id}`)
    );
    
    return response.data;
  }

  async deleteMedia(id: string, userId: string) {
    // Аналогично, в документации нет эндпоинта для удаления медиа,
    // но мы предполагаем, что такой эндпоинт существует
    const response = await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/media/${id}`, {
        headers: { userId },
      })
    );
    
    return response.data;
  }
} 