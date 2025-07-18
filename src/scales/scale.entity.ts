import { Publication } from 'src/articles/article.entity';
import { Researcher } from 'src/researchers/researcher.entity';
import { Column, Entity, JoinTable, ManyToMany, Timestamp } from 'typeorm';

@Entity()
export class Scale extends Publication {
  @Column({ type: 'varchar', length: 15, nullable: false })
  short_title: string;

  @Column({ type: 'simple-array', nullable: false })
  validator_id: number[];

  @ManyToMany(() => Researcher)
  @JoinTable()
  validators: Researcher[];

  @Column({ type: 'timestamp', nullable: true })
  validation_year: Timestamp;
}
