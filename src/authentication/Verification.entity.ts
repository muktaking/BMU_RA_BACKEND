import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('verification')
export class Verification {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  identifier!: string;

  @Column({ type: 'text' })
  value!: string;

  @Column({ type: 'timestamp' })
  expiresAt!: Date;

  @Column('varchar', { length: 255 })
  createdAt!: string;

  @Column('varchar', { length: 255 })
  updatedAt!: string;
}
