import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Param, Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBooksDto } from './dto/create-books.dto';
import { BooksService } from './books.service';
import { UsersService } from '../users/users.service';
import { Books } from './books.entity';
import { AddToUserDto } from './dto/add-to-user.dto';
import { UpdateBooksDto } from './dto/update-books.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createConnection, getConnection } from 'typeorm';
import { Users } from '../users/users.entity';

@ApiBearerAuth('Daniil Klimov')
@ApiTags('books')
@Controller('books')
export class BooksController {

  constructor(private readonly booksService: BooksService,
              private readonly usersService: UsersService) {
  }

  // Создание книги
  @Post()
  @ApiOperation({ summary: 'Book creation' })
  @ApiResponse({
    status: 200,
    description: 'Book created',
    type: Books,
  })
  create(@Body() createBooksDto : CreateBooksDto) : Promise<Books> {
    const book = new Books();
    book.title = createBooksDto.title;
    if (createBooksDto.employ !== undefined) {
      book.employ = createBooksDto.employ;  // При создании нового пользователя подписка не подключена
    }
    return this.booksService.create(book);
  }

  // Добавление книги к пользователю
  @Put(':id')
  @ApiOperation({ summary: 'Adding book to user' })
  @ApiResponse({
    status: 200,
    description: 'Book added',
    type: Books,
  })
  async addtouser(
    @Param('id') id : string,
    @Body() {User} : AddToUserDto) : Promise<Books> {
    const book = await this.booksService.findOne(id);
    const user = await this.usersService.findOne(User);
    if (book.employ === true) {  // Если книга занята, то выдаем ошибку
      throw new HttpException(
        'Book with id = ' + id + ' employed',
        HttpStatus.NOT_FOUND);
    }
    if (user.Sub === false) {  // Если подписка не подключена
      throw new HttpException(
        'User with id = ' + id + ' do not subscribed',
        HttpStatus.NOT_FOUND);
    }
    book.employ = true;
    book.user = user;
    console.log('Book.user' + book.user);
    return this.booksService.addtouser(book);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Book return' })
  @ApiResponse({
    status: 200,
    description: 'Book returned',
    type: Books,
  })
  async employfree(
    @Param('id') id : string,
    @Body() {User} : AddToUserDto) :Promise<Books> {
    const book = await this.booksService.findOne(id);
    const user = await this.usersService.findOne(User);
    if (book.employ === false) {  // Если книга занята, то выдаем ошибку
      throw new HttpException(
        'Book with id = ' + id + ' employed',
        HttpStatus.NOT_FOUND);
    }
    book.employ = false;
    delete book.user;
    return this.booksService.employfree(book);
  }

}
