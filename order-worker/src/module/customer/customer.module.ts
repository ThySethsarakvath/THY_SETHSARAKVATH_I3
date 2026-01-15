// src/modules/customers/customers.module.ts
import { Module } from '@nestjs/common';
import { CustomersController } from './customer.controller';
import { CustomersService } from './customer.service';
import { DatabaseModule } from 'src/database/database.module';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [DatabaseModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
