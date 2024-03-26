import { Injectable, UploadedFile } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async processAndSaveCSV(file) {
    console.log(file);
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const exercises = data.map((row) => ({
      name: row[0] || '',
      HowToUse: row[1] || '',
      level: row[2] || '1',
      muscle: row[3] || 'Geral',
      weight: row[4] || '0',
      qtd: row[5] || '0',
    }));

    try {
      await this.exerciseRepository.save(exercises);
    } catch (error) {
      throw new Error(`Failed to save exercises: ${error.message}`);
    }
  }
}
