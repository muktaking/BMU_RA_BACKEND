import { Profile, SocialProfileBase } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Researcher extends Profile {
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
}

@Entity()
export class SocialProfileResearcher extends SocialProfileBase {
  @ManyToOne(() => Researcher, (researcher) => researcher.socialProfiles)
  researcher: Researcher;
}
