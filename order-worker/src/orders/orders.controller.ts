/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Public health check - BEFORE @UseGuards
  @Get('health')
  health() {
    return {
      ok: true,
      service: 'order-worker',
      timestamp: new Date().toISOString(),
    };
  }

  // Apply auth to all routes below this point
  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Req() req: any) {
    console.log('📋 Controller list orders');
    console.log('👤 User:', req.user);

    return this.ordersService.getUserOrders(req.user.id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  create(@Body() body: any, @Req() req: any) {
    console.log('🛒 Controller create order');
    console.log('👤 User:', req.user);

    return this.ordersService.createOrder(body, req.user);
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles('admin')
  delete(@Req() req: any) {
    console.log('🗑️ Controller delete order');
    console.log('👤 Admin user:', req.user);

    return this.ordersService.deleteOrder(req.user);
  }
}
