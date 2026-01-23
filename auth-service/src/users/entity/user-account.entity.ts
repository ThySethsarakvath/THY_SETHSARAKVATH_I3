import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_accounts')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Should be hashed with bcrypt

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('text', { array: true, default: [] })
  permissions: string[];

  @Column({ nullable: true })
  refreshToken?: string; // For refresh token storage

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
