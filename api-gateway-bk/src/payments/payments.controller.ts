import { PaymentsService } from './payments.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll() {
    return this.paymentsService.hello();
  }

  @Post()
  createPayment() {
    console.log('Creating a new payment...');
    return 'This action adds a new payment';
  }
}
