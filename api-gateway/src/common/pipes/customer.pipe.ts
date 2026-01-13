/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/modules/customers/pipes/verify-customer.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { CustomersService } from 'src/module/customer/customer.service';
import { VerifyCustomerDto } from 'src/module/customer/dto/customer.dto';

@Injectable()
export class CustomerPipe implements PipeTransform {
  constructor(
    @Inject(CustomersService)
    private readonly customersService: CustomersService,
  ) {}

  transform(value: any, metadata: ArgumentMetadata): VerifyCustomerDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Request body must be an object');
    }

    const errors: string[] = [];
    const transformed: any = {};

    if (!value.fullName || typeof value.fullName !== 'string') {
      errors.push('fullName is required and must be a string');
    } else {
      const trimmed = value.fullName.trim();
      if (trimmed.length === 0) {
        errors.push('fullName cannot be empty');
      } else {
        transformed.fullName = trimmed;
      }
    }

    // 2. Validate DOB
    if (!value.dob || typeof value.dob !== 'string') {
      errors.push('dob is required');
    } else {
      const dobResult = this.validateDob(value.dob);
      if (!dobResult.valid) {
        errors.push(dobResult.error!);
      } else {
        transformed.dob = value.dob;
      }
    }

    // 3. Validate and normalize phone
    if (!value.phone || typeof value.phone !== 'string') {
      errors.push('phone is required');
    } else {
      const phoneResult = this.normalizePhone(value.phone);
      if (!phoneResult.valid) {
        errors.push(phoneResult.error!);
      } else {
        transformed.phone = phoneResult.normalized;
      }
    }

    // 4. Validate optional nationalId
    if (value.nationalId) {
      if (typeof value.nationalId !== 'string') {
        errors.push('nationalId must be a string');
      } else {
        const idResult = this.validateNationalId(value.nationalId);
        if (!idResult.valid) {
          errors.push(idResult.error!);
        } else {
          transformed.nationalId = value.nationalId.toUpperCase();
        }
      }
    }

    // If any validation errors, throw
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors,
      });
    }

    // 5. Check if customer is blocked
    const blockCheck = this.customersService.isCustomerBlocked(transformed);
    if (blockCheck.blocked) {
      throw new ForbiddenException(blockCheck.reason);
    }

    return transformed as VerifyCustomerDto;
  }

  private validateDob(dob: string): { valid: boolean; error?: string } {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dob.match(dateRegex);

    if (!match) {
      return { valid: false, error: 'dob must be in dd/mm/yyyy format' };
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return { valid: false, error: 'dob is not a valid calendar date' };
    }

    if (year >= 2010) {
      return { valid: false, error: 'dob year must be before 2010' };
    }

    return { valid: true };
  }

  private normalizePhone(phone: string): {
    valid: boolean;
    normalized?: string;
    error?: string;
  } {
    let cleaned = phone.replace(/[\s\-()]/g, '');

    if (!/^\+?\d+$/.test(cleaned)) {
      return {
        valid: false,
        error: 'phone must contain only digits and optional + prefix',
      };
    }

    if (cleaned.startsWith('0')) {
      cleaned = '+855' + cleaned.substring(1);
    }

    if (!cleaned.startsWith('+855')) {
      return { valid: false, error: 'phone must start with +855 or 0' };
    }

    const digitsAfterCode = cleaned.substring(4);
    if (digitsAfterCode.length < 8 || digitsAfterCode.length > 9) {
      return { valid: false, error: 'invalid phone number length' };
    }

    return { valid: true, normalized: cleaned };
  }

  private validateNationalId(id: string): { valid: boolean; error?: string } {
    // Simple pattern: Letter + 7 digits
    if (!/^[A-Z]\d{7}$/i.test(id)) {
      return {
        valid: false,
        error: 'nationalId must be 1 letter followed by 7 digits',
      };
    }
    return { valid: true };
  }
}
