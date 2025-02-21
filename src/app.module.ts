import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { Colaborador } from './colaborador/entities/colaborador.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: '123456',
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // DO NOT USE IN PRODUCTION
      entities: [Colaborador],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations_typeorm',
    }),
    ColaboradorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
