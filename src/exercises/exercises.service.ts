import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto) {
    console.log(createExerciseDto);
    try {
      const result = await this.exerciseRepository
        .createQueryBuilder()
        .insert()
        .into(Exercise)
        .values(createExerciseDto)
        .execute();

      return result.raw;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const result = await this.exerciseRepository.find();
      return {
        result,
        length: result.length,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.exerciseRepository.findOne({
        where: { id: id },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    try {
      const result = await this.exerciseRepository.update(
        id,
        updateExerciseDto,
      );
      return result;
    } catch (error) {
      console.error(`Erro ao atualizar exercício com ID ${id}:`, error);
      throw new Error(
        `Erro ao atualizar exercício com ID ${id}. Consulte os logs para obter mais informações.`,
      );
    }
  }

  async remove(id: number) {
    try {
      const result = await this.exerciseRepository.delete(id);
      return result;
    } catch (error) {
      console.error(`Erro ao excluir exercício com ID ${id}:`, error);
      throw new Error(
        `Erro ao excluir exercício com ID ${id}. Consulte os logs para obter mais informações.`,
      );
    }
  }
}
