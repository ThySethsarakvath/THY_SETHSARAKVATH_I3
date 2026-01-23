/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthIntrospectionService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  private get authUrl() {
    return (
      this.config.get<string>('AUTH_SERVICE_URL') || 'http://auth-service:3000'
    );
  }

  extractBearerToken(authHeader?: string) {
    if (!authHeader?.startsWith('Bearer ')) return null;
    return authHeader.slice('Bearer '.length);
  }

  async validate(token: string) {
    try {
      // Call auth-service's /auth/me endpoint
      const res = await firstValueFrom(
        this.http.get(`${this.authUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 4000,
        }),
      );

      // Your auth-service returns: { user: { id, email, roles, permissions } }
      return res.data;
    } catch (error) {
      console.error('Token validation failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
