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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'api_gym',
      entities: [Exercise],
      synchronize: true,
    }),
    UsersModule,
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
  providers: [AppService],
})
export class AppModule {}
