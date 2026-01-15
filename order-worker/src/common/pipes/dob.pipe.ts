import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DobPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException(
        'Date of birth is required and must be a string',
      );
    }
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = value.match(dateRegex);

    if (!match) {
      throw new BadRequestException(
        'Date of birth must be in dd/mm/yyyy format',
      );
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
      throw new BadRequestException('Invalid date - not a real calendar date');
    }

    if (year >= 2010) {
      throw new BadRequestException('Date of birth year must be before 2010');
    }
    return value;
  }
}
