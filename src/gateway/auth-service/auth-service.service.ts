import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthServiceService {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const host = this.configService.get('AUTH_SERVICE_HOST', '192.168.100.45');
    const port = this.configService.get('AUTH_SERVICE_PORT', 4001);
    this.baseUrl = `http://${host}:${port}`;
  }

  async login(email: string, password: string) {
    const query = `
      mutation {
        login(email: "${email}", password: "${password}") {
          accessToken
          refreshToken
          email
          name
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { query })
    );
    
    return response.data.data.login;
  }

  async register(user: any) {
    const { email, password, name } = user;
    const query = `
      mutation {
        register(
          email: "${email}"
          password: "${password}"
          confirmPassword: "${password}"
          name: "${name}"
        ) {
          id
          email
          name
          isVerified
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { query })
    );
    
    return response.data.data.register;
  }

  async validateToken(token: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/graphql`,
        { query: `{ validateToken }` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
    
    return !response.data.errors;
  }

  async getUser(id: string) {
    const query = `
      query {
        getUser(id: "${id}") {
          id
          email
          name
          isVerified
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { query })
    );
    
    return response.data.data.getUser;
  }

  async refreshTokens(refreshToken: string) {
    const query = `
      mutation {
        refreshTokens(refreshToken: "${refreshToken}") {
          accessToken
          refreshToken
          email
          name
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { query })
    );
    
    return response.data.data.refreshTokens;
  }

  async logout(token: string) {
    const query = `
      mutation {
        logout
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/graphql`, 
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
    
    return response.data.data.logout;
  }

  async verifyEmail(email: string, code: string) {
    const query = `
      mutation {
        verifyEmail(email: "${email}", code: "${code}") {
          success
          message
          accessToken
          refreshToken
          email
          name
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { query })
    );
    
    return response.data.data.verifyEmail;
  }

  async googleAuth(token: string) {
    const query = `
      mutation {
        googleAuth(token: "${token}") {
          accessToken
          refreshToken
          email
          name
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { query })
    );
    
    return response.data.data.googleAuth;
  }

  async facebookAuth(token: string) {
    const query = `
      mutation {
        facebookAuth(token: "${token}") {
          accessToken
          refreshToken
          email
          name
        }
      }
    `;
    
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/graphql`, { query })
    );
    
    return response.data.data.facebookAuth;
  }
} 