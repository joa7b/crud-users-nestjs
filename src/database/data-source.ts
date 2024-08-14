import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import DataSourceConfig from './config';

ConfigModule.forRoot();

export const AppDataSource = new DataSource(
  DataSourceConfig() as DataSourceOptions,
);
