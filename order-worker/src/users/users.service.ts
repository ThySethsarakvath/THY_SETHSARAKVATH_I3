import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPO') // <-- matches `${entity.name.toUpperCase()}_REPO`
    private readonly userRepository: Repository<User>,
  ) {}

  async create(name: string, dob: string): Promise<User> {
    const user = this.userRepository.create({ name, dob });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, name?: string, dob?: string): Promise<User> {
    const user = await this.findOne(id);
    if (name) user.name = name;
    if (dob) user.dob = dob;
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
