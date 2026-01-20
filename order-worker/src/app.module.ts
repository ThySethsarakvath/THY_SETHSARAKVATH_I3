/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './module/category/category.module';
import { ProductModule } from './module/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { CustomersModule } from './module/customer/customer.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    OrdersModule,
    ReceiptsModule,
    PaymentsModule,
    NotificationsModule,
    CategoryModule,
    ProductModule,
    UserModule,
    CustomersModule,
    GraphqlModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: 'schema.gql',
      typePaths: [join(process.cwd(), 'src/**/*.graphql')],
      sortSchema: true,
      playground: true,
    }),
    DatabaseModule.forRoot({
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
    }),
    NotificationsModule.forRoot({
      appName: 'API_Gateway_Lab',
      defaultChannel: 'log',
      enable: true,
    }),
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
