import { Controller, Post, Body } from '@nestjs/common';
import { PharseDoBPipe } from './dto/pharse-dob.pipe';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body('dob', PharseDoBPipe) dob: string) {
    return { message: 'User created successfully', dob };
  }
}
