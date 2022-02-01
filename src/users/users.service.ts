import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // Поиск всех пользователей
  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  // Поиск одного пользователя
  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  // Создание пользователя
  create(users: Users): Promise<Users> {
    delete users.id;
    return this.usersRepository.save(users);
  }

  // Обновление информации о пользователе
  update(users: Users): Promise<Users> {
    return this.usersRepository.save(users);
  }

  // Добавление подписки к пользователю
  updatesub(users: Users): Promise<Users> {
    return this.usersRepository.save(users);
  }

  // Удаление пользователя
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}