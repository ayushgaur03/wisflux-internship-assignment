import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { users_ent } from './users/users.entity';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres_ayush',
  password: 'Ayush037',
  port: 5432,
  host: 'localhost',
  database: 'wisflux_pizza',
  synchronize: true,
  entities: [users_ent],
};
