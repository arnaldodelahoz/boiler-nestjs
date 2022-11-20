import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export abstract class AbstractService<T, ID> {
  private readonly repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }

  async findOneById(id: ID): Promise<T> {
    const item = await this.repository.findOneBy(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} was not found`);
    }
    return item;
  }

  async update(id: ID, data: DeepPartial<T>): Promise<T> {
    const item = await this.findOneById(id);
    return this.repository.merge(item, data);
  }
  async delete(id: ID | any): Promise<boolean> {
    await this.findOne(id);
    this.repository.delete(id);
    return true;
  }
  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T[]> {
    return this.repository.findBy(where);
  }

  async findOneBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T | null> {
    return this.repository.findOneBy(where);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }
}
