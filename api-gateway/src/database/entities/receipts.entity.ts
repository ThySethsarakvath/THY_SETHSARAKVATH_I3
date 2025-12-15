/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Entity('receipt')
export class Receipt {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @PrimaryGeneratedColumn('uuid')
  receiptId: string;

  @Column({ type: 'timestamptz', nullable: false })
  issuedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'numeric', nullable: false })
  price: number;
}
