import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Training } from 'src/trainings/entities/training.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
  ) {}
  async create(createTrainingDto: CreateTrainingDto) {
    console.log(createTrainingDto);
    try {
      const exercises = await Promise.all(
        createTrainingDto.exercises.map(async (trainingId) => {
          return await this.exerciseRepository.findOne({
            where: { id: Number(trainingId) },
          });
        }),
      );

      console.log(exercises);

      return {
        message: 'SUCESSO',
        body: exercises,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all trainings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} training`;
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  remove(id: number) {
    return `This action removes a #${id} training`;
  }
}
