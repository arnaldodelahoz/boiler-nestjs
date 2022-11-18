import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, dbName, password, port, host } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          migrationsTableName: 'migrations',
          synchronize: false,
          entities: [__dirname+'/../**/*.entity{.ts,.js}'],
          migrations: [__dirname+'/../database/migrations/*{.ts,.js}'],
          migrationsRun: false,
          cli: {
            migrationsDir: __dirname+'/../database/migrations',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
