import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';

@Module( {
  imports: [TypeOrmModule.forFeature([Books, Users])],
  providers: [BooksService, UsersService],
  controllers: [BooksController]
})

export class BooksModule {

}