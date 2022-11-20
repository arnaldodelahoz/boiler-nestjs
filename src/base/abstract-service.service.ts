import { NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

export abstract class AbstractService<T, ID> {
  private readonly repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity =  this.repository.create(entity);
    return await this.repository.save(newEntity);

  }

  async findOne(id: ID): Promise<T> {
    const item = await this.repository.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} was not found`);
    }
    return item;
  }

  async update(id: ID, data: DeepPartial<T>): Promise<T> {
    const item = await this.findOne(id);
    return this.repository.merge(item, data);
  }
  async delete(id: ID | any): Promise<boolean> {
    await this.findOne(id);
    await this.repository.delete(id);
    return true;
  }
  async findAll(): Promise<T[]> {
    return this.repository.find();
  }
}
