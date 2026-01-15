import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentsModule } from 'src/payments/payments.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
// import { PaymentsService } from 'src/payments/payments.service';

@Module({
  imports: [
    NotificationsModule.forFeature({
      featureName: 'orders',
      prefix: '[ORDERS]',
      channels: ['log', 'email'],
    }),
    forwardRef(() => PaymentsModule),
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'orders_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
