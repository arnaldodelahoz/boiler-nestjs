import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { AbstractService } from 'src/base/abstract-service.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends AbstractService<User, number> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await super.findOne({
      where: {
        email,
      },
      relations: {
        role: true,
      },
    });
  }

  async create(dto: CreateUserDto): Promise<User | undefined> {
    dto.password = await hash(dto.password, 10);
    return await super.create(dto);
  }
}
