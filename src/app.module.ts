import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { Colaborador } from './colaborador/entities/colaborador.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatbotModule } from './websockets/chatbot.module';
import { InstituicaoModule } from './instituicao/instituicao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // DO NOT USE IN PRODUCTION
        entities: [Colaborador],
        migrations: ['dist/migrations/*.js'],
        migrationsTableName: 'migrations_typeorm',
      }),
      inject: [ConfigService],
    }),
    ColaboradorModule,
    AuthModule,
    UsersModule,
    ChatbotModule,
    InstituicaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
