import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PharseDoBPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!this.isValidDob(value)) {
      throw new BadRequestException(
        'Invalid Date of Birth. Must be dd/mm/yyyy and year < 2010',
      );
    }
    return value;
  }

  private isValidDob(value: string): boolean {
    const regex = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/;

    if (!regex.test(value)) {
      return false;
    }

    const parts = value.split('/');
    const year = parseInt(parts[2], 10);

    if (year >= 2010) {
      return false;
    }

    return true;
  }
}
