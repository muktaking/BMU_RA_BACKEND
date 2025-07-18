import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

export enum RolePermitted {
  guest = 0,
  member = 1,
  researcher = 2,
  moderator = 3,
  coordinator = 4,
  admin = 5,
}

export enum LoginProvider {
  local = 0,
  facebook = 1,
  google = 2,
}

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Institute {
  bmu = 1,
  nimh = 2,
  somch = 3,
  afmc = 4,
  foreign = 6,
  local = 7,
}

export abstract class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  avatar: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  degree: string;

  @Column({ type: 'enum', enum: Institute })
  institute: Institute;

  @Column({ type: 'text', nullable: true })
  address: string;
}

@Entity()
export class User extends Profile {
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: RolePermitted, default: RolePermitted.member })
  role: RolePermitted;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiration: Timestamp;

  @OneToMany(() => SocialProfile, (socialProfile) => socialProfile.user, {
    cascade: true,
    eager: true,
  })
  socialProfiles: SocialProfile[];
}

@Entity()
export class SocialProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: string; // e.g., "facebook", "twitter"

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.socialProfiles)
  user: User;
}
