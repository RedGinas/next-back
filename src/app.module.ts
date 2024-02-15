import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodesModule } from './codes/codes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'dc60aqv40pca52',
      username: 'kmizayujpxsgnb',
      password:
        '07f94d4d8315d06e640a244b1092dd59424b9c87bfba723e80a9e4a792b435bd',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    CodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
