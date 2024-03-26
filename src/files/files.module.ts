import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
