import { Profile } from 'src/users/user.entity';
import { Column, Entity } from 'typeorm';

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
}
