import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from './gateway/gateway.controller';
import { AuthIntrospectionService } from './auth/auth-introspection.service';
import { ProxyService } from './proxy/proxy.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [GatewayController, AppController],
  providers: [ProxyService, AppService, AuthIntrospectionService],
})
export class AppModule {}
