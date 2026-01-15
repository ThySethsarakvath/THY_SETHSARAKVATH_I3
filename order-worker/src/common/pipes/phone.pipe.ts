import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PhonePipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === null) {
      console.log(value);
      throw new BadRequestException('Tells is required');
    }

    if (typeof value !== 'string') {
      throw new BadRequestException('Phone number must be a string');
    }

    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
      throw new BadRequestException('Phone number cannot be empty');
    }

    let cleaned = trimmedValue.replace(/[\s\-()]/g, '');

    if (!/^\+?\d+$/.test(cleaned)) {
      throw new BadRequestException('Phone number must contain only digits');
    }

    if (cleaned.startsWith('0')) {
      cleaned = '+855' + cleaned.substring(1);
    }

    if (!cleaned.startsWith('+855')) {
      throw new BadRequestException('Phone number must start with +855 or 0');
    }
    const digitsAfterCode = cleaned.substring(4);
    if (digitsAfterCode.length < 8 || digitsAfterCode.length > 9) {
      throw new BadRequestException(
        `Invalid phone number length. Expected 8-9 digits after +855, got ${digitsAfterCode.length}`,
      );
    }

    return cleaned;
  }
}
