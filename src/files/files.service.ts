import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(Exercise)
        private exerciseRepository: Repository<Exercise>
      ) {}

    async processAndSaveCSV(file) {
        const results = [];
        console.log(file)
        await new Promise<void>((resolve, reject) => {
          fs.createReadStream('src/uploads/versao2.xlsx')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log('subiu', file)
                console.log('subiu', results)
                this.exerciseRepository.save(results)
              resolve();
            })
            .on('error', (error) => {
              reject(error);
            });
        });
}
}
