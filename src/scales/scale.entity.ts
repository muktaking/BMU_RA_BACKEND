import { Publication } from 'src/articles/article.entity';
import { Researcher } from 'src/researchers/researcher.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Scale extends Publication {
  @Column({ type: 'varchar', length: 25, nullable: false })
  short_title: string;

  @Column({ type: 'simple-array', nullable: false })
  validator_id: number[];

  @Column({ type: 'simple-array', nullable: false })
  validator_name: string[];

  @ManyToMany(() => Researcher)
  @JoinTable()
  validators: Researcher[];

  @Column({
    type: 'timestamp',
    nullable: true,
    transformer: {
      to: (value: string | Date) => value,
      from: (value: Date) => (value ? value.toDateString() : value),
    },
  })
  validation_year: string;
}
