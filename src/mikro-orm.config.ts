import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { LoadStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ConfigService } from '@nestjs/config';

const cfg = new ConfigService();

const MikroOrmConfig: Options = {
  type: 'postgresql',
  host: cfg.get('DB_HOST'),
  port: cfg.get('DB_PORT'),
  user: cfg.get('DB_USERNAME'),
  password: cfg.get('DB_PASSWORD'),
  dbName: cfg.get('DB_DATABASE'),
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  registerRequestContext: false,
  migrations: {
    path: 'dist/database/migrations',
    pathTs: 'src/database/migrations',
  },
  seeder: {
    path: 'dist/database/seeds',
    pathTs: 'src/database/seeds',
  },
};

export default MikroOrmConfig;
