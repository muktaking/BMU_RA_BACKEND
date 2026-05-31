import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  userId!: string;

  @Column({ type: 'varchar', length: 255 })
  accountId!: string;

  @Column({ type: 'varchar', length: 255 })
  providerId!: string;

  @Column({ type: 'text', nullable: true })
  accessToken?: string;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  accessTokenExpiresAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  refreshTokenExpiresAt?: Date;

  @Column({ type: 'text', nullable: true })
  scope?: string;

  @Column({ type: 'text', nullable: true })
  idToken?: string;

  @Column({ type: 'text', nullable: true })
  password?: string;

  @Column('varchar', { length: 255 })
  createdAt!: string;

  @Column('varchar', { length: 255 })
  updatedAt!: string;
}
