import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  fullName: string;

  @Column({ type: 'text' })
  dob?: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ unique: true })
  nationalId?: string;
}
