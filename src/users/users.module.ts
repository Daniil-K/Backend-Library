import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Books } from '../books/books.entity';
import { BooksService } from '../books/books.service';

@Module( {
  imports: [TypeOrmModule.forFeature([Users, Books])],
  providers: [UsersService, BooksService],
  controllers: [UsersController]
})

export class UsersModule {

}