import { DataSource } from 'typeorm';
import { Task } from './entities/Task';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Task],
  subscribers: [],
  migrations: []
});

AppDataSource.initialize()
  .then(() => {
    console.log('[server]: Database initialized');
  })
  .catch((error) => console.error(error));