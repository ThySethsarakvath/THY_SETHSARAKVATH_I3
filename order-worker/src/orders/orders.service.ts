/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly client: ClientProxy,
    private readonly paymentsService: PaymentsService,
    private readonly notifications: NotificationsService,
  ) {}

  createOrder(orderDto: any, user: any) {
    // Include user info in order event
    const orderEvent = {
      order: orderDto,
      userId: user.id,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    console.log('📤 Emitting order_created event:', orderEvent);

    // Emit to RabbitMQ
    this.client.emit('order_created', orderEvent);

    // Send notifications
    this.notifications.notify('orders', 'order_created', {
      ...orderEvent,
      message: `Order created by ${user.email}`,
    });

    return {
      status: 'Order accepted',
      order: orderDto,
      userId: user.id,
      userEmail: user.email,
    };
  }

  deleteOrder(user: any) {
    const deleteEvent = {
      deletedBy: user.id,
      deletedByEmail: user.email,
      deletedAt: new Date().toISOString(),
    };

    console.log('📤 Emitting order_deleted event:', deleteEvent);

    this.client.emit('order_deleted', deleteEvent);

    this.notifications.notify('orders', 'order_deleted', {
      ...deleteEvent,
      message: `Order deleted by admin ${user.email}`,
    });

    return {
      status: 'Order deletion requested',
      deletedBy: user.email,
    };
  }

  // New method: Get user's orders (mock for now)
  getUserOrders(userId: number) {
    // In real app, query database filtered by userId
    // For now, return mock data
    return [
      {
        id: 1,
        userId,
        product: 'Laptop',
        quantity: 1,
        total: 999.99,
        status: 'completed',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        userId,
        product: 'Mouse',
        quantity: 2,
        total: 49.98,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
