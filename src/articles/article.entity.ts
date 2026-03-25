import { Researcher } from 'src/researchers/researcher.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BasePublication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  publication_link: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  server_link: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    transformer: {
      to: (value: string | Date) => value,
      from: (value: Date) => (value ? value.toDateString() : value),
    },
  })
  published_year: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publisher: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];
}

export abstract class Publication extends BasePublication {
  @Column({ type: 'simple-array', nullable: false })
  author_id: number[];

  @Column({ type: 'simple-array', nullable: false })
  author_name: string[];

  @ManyToMany(() => Researcher)
  @JoinTable()
  authors: Researcher[];
}

@Entity()
export class Article extends Publication {
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  doi: string;

  @BeforeInsert()
  generateDOI() {
    if (!this.doi || this.doi.trim() === '') {
      this.doi = `10.${Date.now()}/${Math.random().toString(36).substring(2, 9)}`;
    }
  }
}
