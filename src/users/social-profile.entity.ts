import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export abstract class SocialProfileBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: string; // e.g., "facebook", "twitter"

  @Column()
  url: string;
}

@Entity()
export class SocialProfile extends SocialProfileBase {
  @ManyToOne(() => User, (user) => user.socialProfiles)
  user: User;
}
