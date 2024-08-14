import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

function DataSourceConfig() {
  if (configService.get('NODE_ENV') === 'test') {
    console.log('Using in-memory database for testing');
    return {
      database: ':memory:',
      dropSchema: true,
      entities: ['src/**/*.entity.ts'],
      synchronize: true,
      type: 'better-sqlite3',
    };
  } else {
    console.log('Using database for development/production');
    return {
      host: configService.getOrThrow('DB_HOST'),
      port: parseInt(configService.getOrThrow('DB_PORT'), 10),
      username: configService.getOrThrow('DB_USERNAME'),
      password: configService.getOrThrow('DB_PASSWORD'),
      database: configService.getOrThrow('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: ['./migrations/*{.ts,.js}'],
      seeds: ['./database/seeds/*{.ts,.js}'],
      factories: ['./database/factories/*{.ts,.js}'],
      synchronize: false,
      type: 'mysql',
      logging: 'query',
    };
  }
}

export default DataSourceConfig;
