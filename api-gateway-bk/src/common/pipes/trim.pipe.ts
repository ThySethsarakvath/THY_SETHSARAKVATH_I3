import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException(`${metadata.data} must be a string`);
    }

    const trimmed = value.trim();

    if (trimmed.length === 0) {
      throw new BadRequestException(
        `${metadata.data} cannot be empty after trimming`,
      );
    }

    return trimmed;
  }
}
