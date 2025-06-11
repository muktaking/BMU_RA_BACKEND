import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'muktaking',
  password: '22222',
  database: 'bmu',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

// cache: true,
