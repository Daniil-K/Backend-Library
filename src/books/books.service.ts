import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  // Поиск всех книг
  findAll(): Promise<Books[]> {
    return this.booksRepository.find();
  }

  // Поиск конкретной книги
  findOne(id: string): Promise<Books> {
    return this.booksRepository.findOne(id);
  }

  // Создание нового экземпляра книги
  create(books: Books): Promise<Books> {
    delete books.id;
    return this.booksRepository.save(books);
  }

  // Добавление книги к пользователю
  addtouser(books: Books): Promise<Books> {
    return this.booksRepository.save(books);
  }

  employfree(books: Books): Promise<Books> {
    return this.booksRepository.save(books);
  }

  // Удаление книги
  async remove(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }
}