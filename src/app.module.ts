import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { ExercisesModule } from './exercises/exercises.module';
import { TrainingsModule } from './trainings/trainings.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './exercises/entities/exercise.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'api_gym',
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule,
    TeachersModule,
    ExercisesModule,
    TrainingsModule,
    ClientsModule,
    FilesModule,
    MulterModule.register({
      dest: './uploads'
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtGuard,
  },
  JwtStrategy,
],
})
export class AppModule {}
