// src/modules/customers/customers.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { DobPipe } from 'src/common/pipes/dob.pipe';
import { PhonePipe } from 'src/common/pipes/phone.pipe';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { VerifyCustomerDto, VerifyCustomerResponse } from './dto/customer.dto';
import { NotBlockedPipe } from 'src/common/pipes/notBlocked.pipe';
import { CustomerPipe } from 'src/common/pipes/customer.pipe';
import { normalize } from 'path';

@Controller('customers')
export class CustomersController {
  //Part D
  //   @Post('verify')
  //   verify(
  //     @Body('fullName', TrimPipe) fullName: string,
  //     @Body('dob', DobPipe) dob: string,
  //     @Body('phone', PhonePipe, NotBlockedPipe) phone: string,
  //     @Body('nationalId') nationalId?: string,
  //   ): VerifyCustomerResponse {
  //     return {
  //       ok: true,
  //       normalized: {
  //         fullName,
  //         dob,
  //         phone,
  //         nationalId,
  //       },
  //     };
  //   }

  // Part F
  @Post('verify')
  verify(@Body(CustomerPipe) customer: VerifyCustomerDto) {
    return {
      ok: true,
      normalize: customer,
    };
  }
}
