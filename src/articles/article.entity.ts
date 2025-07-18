import { Researcher } from 'src/researchers/researcher.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

export abstract class Publication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'simple-array', nullable: false })
  author_id: number[];

  @ManyToMany(() => Researcher)
  @JoinTable()
  authors: Researcher[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  publication_link: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  server_link: string;

  @Column({ type: 'timestamp', nullable: true })
  published_year: Timestamp;

  @Column({ type: 'varchar', length: 15, nullable: true })
  publisher: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];
}

@Entity()
export class Article extends Publication {
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  doi: string;
}
