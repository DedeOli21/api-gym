export class CreateTrainingDto {
  idUser: number;
  active: boolean;
  validAt: Date;
  type: string;
  exercises: Exercises[];
}

export interface Exercises {
  id: number;
  name: string;
}
