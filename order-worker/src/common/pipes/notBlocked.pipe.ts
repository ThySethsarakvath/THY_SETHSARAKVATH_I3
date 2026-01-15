/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/modules/customers/pipes/customer-not-blocked.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { CustomersService } from 'src/module/customer/customer.service';

@Injectable()
export class NotBlockedPipe implements PipeTransform {
  constructor(
    @Inject(CustomersService)
    private readonly customersService: CustomersService,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // If checking a phone directly
    if (metadata.data === 'phone' && typeof value === 'string') {
      if (this.customersService.isBlockedPhone(value)) {
        throw new ForbiddenException(
          'This phone number is blocked from making orders',
        );
      }
      return value;
    }
    if (metadata.type === 'body' && typeof value === 'object') {
      const checkResult = this.customersService.isCustomerBlocked(value);

      if (checkResult.blocked) {
        throw new ForbiddenException(
          checkResult.reason || 'Customer is blocked',
        );
      }

      return value;
    }

    return value;
  }
}
