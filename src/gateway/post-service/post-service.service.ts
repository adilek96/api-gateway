import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PostServiceService {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const host = this.configService.get('POST_SERVICE_HOST', '192.168.100.45');
    const port = this.configService.get('POST_SERVICE_PORT', 4002);
    this.baseUrl = `http://${host}:${port}`;
  }

  async getPosts(filter: any = {}) {
    const query = `
      query GetAllPosts($filter: GetAllPostsInput) {
        getAllPosts(filter: $filter) {
          id
          title
          content
          createdAt
          updatedAt
          categories {
            id
            name
          }
          subcategories {
            id
            name
          }
          media {
            id
            url
            type
          }
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { 
        query,
        variables: { filter }
      })
    );
    
    return response.data.data.getAllPosts;
  }

  async getPostById(id: string) {
    const query = `
      query GetPostById($id: Int!) {
        getPostById(id: $id) {
          id
          title
          content
          createdAt
          updatedAt
          categories {
            id
            name
          }
          subcategories {
            id
            name
          }
          media {
            id
            url
            type
          }
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { 
        query,
        variables: { id: parseInt(id, 10) }
      })
    );
    
    return response.data.data.getPostById;
  }

  async createPost(data: any) {
    const query = `
      mutation CreatePost($data: CreatePostInput!) {
        createPost(data: $data) {
          id
          title
          content
          createdAt
          updatedAt
          categories {
            id
            name
          }
          subcategories {
            id
            name
          }
          media {
            id
            url
            type
          }
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { 
        query,
        variables: { data }
      })
    );
    
    return response.data.data.createPost;
  }

  async updatePost(id: string, data: any) {
    const query = `
      mutation UpdatePost($id: Int!, $data: UpdatePostInput!) {
        updatePost(id: $id, data: $data) {
          id
          title
          content
          createdAt
          updatedAt
          categories {
            id
            name
          }
          subcategories {
            id
            name
          }
          media {
            id
            url
            type
          }
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { 
        query,
        variables: { 
          id: parseInt(id, 10),
          data
        }
      })
    );
    
    return response.data.data.updatePost;
  }

  async deletePost(id: string) {
    const query = `
      mutation DeletePost($id: Int!) {
        deletePost(id: $id)
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { 
        query,
        variables: { id: parseInt(id, 10) }
      })
    );
    
    return response.data.data.deletePost;
  }
} 