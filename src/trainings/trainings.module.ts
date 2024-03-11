import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Training } from './entities/training.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise]),
    TypeOrmModule.forFeature([Training]),
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService],
})
export class TrainingsModule {}
