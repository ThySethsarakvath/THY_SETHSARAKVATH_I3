/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,

    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoles: Repository<UserRole>,

    @InjectRepository(RolePermission)
    private readonly rolePerms: Repository<RolePermission>,

    @InjectRepository(RefreshToken)
    private readonly refreshTokens: Repository<RefreshToken>,

    @InjectRepository(Role)
    private readonly roles: Repository<Role>,
  ) {}

  /** Register new user */
  async register(email: string, password: string) {
    const existing = await this.users.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.users.create({ email, passwordHash });
    await this.users.save(user);

    let defaultRole = await this.roles.findOne({ where: { name: 'user' } });
    if (!defaultRole) {
      defaultRole = this.roles.create({ name: 'user' });
      await this.roles.save(defaultRole);
    }

    const userRole = this.userRoles.create({ user, role: defaultRole });
    await this.userRoles.save(userRole);

    return { message: 'registered', userId: user.id };
  }

  /** Login existing user */
  async login(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const roles = await this.userRoles.find({
      where: { user: { id: user.id } },
      relations: { role: true },
    });
    const roleNames = roles.map((r) => r.role.name);

    const roleIds = roles.map((r) => r.role.id);
    const perms = await this.rolePerms
      .createQueryBuilder('rp')
      .leftJoinAndSelect('rp.permission', 'permission')
      .where('rp.roleId IN (:...roleIds)', { roleIds })
      .getMany();

    const permissionKeys = [...new Set(perms.map((x) => x.permission.key))];

    // Sign JWT access token
    const accessToken = await this.jwt.signAsync(
      {
        sub: user.id,
        email: user.email,
        roles: roleNames,
        permissions: permissionKeys,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: (process.env.JWT_ACCESS_EXPIRES as any) ?? '15m',
      },
    );

    // Generate refresh token
    const refreshToken = randomBytes(48).toString('hex');
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const rtEntity = this.refreshTokens.create({
      user,
      tokenHash: refreshTokenHash,
      expiresAt,
    });
    await this.refreshTokens.save(rtEntity);

    return { accessToken, refreshToken };
  }
}
