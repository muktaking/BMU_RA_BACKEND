import { Publication } from 'src/articles/article.entity';
import { Column, Entity, Timestamp } from 'typeorm';

@Entity()
export class Scale extends Publication {
  @Column({ type: 'varchar', length: 15, nullable: false })
  short_title: string;

  @Column({ nullable: false })
  validator: string;

  @Column({ type: 'timestamp', nullable: true })
  validation_year: Timestamp;
}
