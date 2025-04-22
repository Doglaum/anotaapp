import * as Models from '../database/models';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({  
  type: 'expo',
  database: 'anotaapp.db',
  driver: require('expo-sqlite'),
  entities: [...Object.values(Models)],
  synchronize: true,
  logging: true,
}); 