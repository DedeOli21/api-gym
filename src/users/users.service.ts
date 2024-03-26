import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UUID } from 'crypto';

@Injectable()
export class UsersService extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      console.log(email);
      const result = await this.usersRepository.findOne({ where: { email } });
      if (result instanceof Error) throw new Error();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  findOneById(id: UUID): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  // create(user: User): Promise<User> {
  //   return this.usersRepository.save(user);
  // }

  update(userId: UUID, userInformation: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(userId, userInformation);
  }
}
