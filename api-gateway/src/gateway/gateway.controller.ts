/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  All,
  Controller,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from '../proxy/proxy.service';
import { AuthIntrospectionService } from '../auth/auth-introspection.service';

@Controller('api')
export class GatewayController {
  constructor(
    private config: ConfigService,
    private proxy: ProxyService,
    private auth: AuthIntrospectionService,
  ) {}

  @All('*')
  async routeAll(@Req() req: Request, @Res() res: Response) {
    const pathOnly = req.path;

    // Extract service key from path
    // Example: /api/auth/login -> serviceKey = 'auth', rest = ['login']
    // Example: /api/orders/123 -> serviceKey = 'orders', rest = ['123']
    const afterApi = pathOnly.replace(/^\/api\//, '');
    const [serviceKey, ...rest] = afterApi.split('/');
    const forwardPath =
      '/' + serviceKey + (rest.length > 0 ? '/' + rest.join('/') : '');

    // Resolve which service to route to
    const route = this.resolveRoute(serviceKey);
    if (!route) {
      return res.status(404).json({
        message: `Unknown route: ${serviceKey}`,
        availableRoutes: ['auth', 'orders'],
      });
    }

    // --- GATEWAY FEATURE 1: Authentication Enforcement ---
    let user: any = null;
    const authHeader = req.headers['authorization'] as string | undefined;

    if (route.protected) {
      const token = this.auth.extractBearerToken(authHeader);
      if (!token) {
        throw new UnauthorizedException('Missing Bearer token');
      }

      const payload = await this.auth.validate(token);
      user = payload.user ?? payload;
    }

    // --- GATEWAY FEATURE 2: Forward Request ---
    const upstream = await this.proxy.forward({
      baseUrl: route.baseUrl,
      method: req.method,
      path: forwardPath === '/' ? '' : forwardPath,
      headers: {
        ...req.headers,
        // --- GATEWAY FEATURE 3: Propagate User Identity ---
        ...(user
          ? {
              'x-user-id': String(user.id),
              'x-user-email': user.email,
              'x-user-roles': JSON.stringify(user.roles ?? []),
              'x-user-permissions': JSON.stringify(user.permissions ?? []),
            }
          : {}),
      },
      query: req.query,
      body: req.body,
    });

    // --- GATEWAY FEATURE 4: Response Pass-through ---
    res.status(upstream.status);
    return res.send(upstream.data);
  }

  private resolveRoute(
    serviceKey: string,
  ): null | { baseUrl: string; protected: boolean } {
    switch (serviceKey) {
      case 'auth':
        return {
          baseUrl:
            this.config.get<string>('AUTH_SERVICE_URL') ||
            'http://auth-service:3000',
          protected: false, // Login is public
        };
      case 'orders':
        return {
          baseUrl:
            this.config.get<string>('ORDER_SERVICE_URL') ||
            'http://order-worker:3000',
          protected: true, // Orders require authentication
        };
      default:
        return null;
    }
  }
}
