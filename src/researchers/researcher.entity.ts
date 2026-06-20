import { SocialProfileBase } from '@/users/social-profile.entity';
import { Profile } from '@/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Researcher extends Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  publication: string;

  @Column({ nullable: true })
  awards: string;

  @Column({ nullable: true })
  int_affiliation: string;

  @Column({ nullable: true })
  editor_in_Journal: string;

  @OneToMany(
    () => SocialProfileResearcher,
    (socialProfile) => socialProfile.researcher,
    {
      cascade: true,
      eager: true,
    },
  )
  socialProfiles: SocialProfileResearcher[];

  // @Column()
  // createdById: number;
}

@Entity()
export class SocialProfileResearcher extends SocialProfileBase {
  @ManyToOne(() => Researcher, (researcher) => researcher.socialProfiles)
  researcher: Researcher;
}
