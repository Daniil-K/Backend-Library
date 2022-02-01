import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  NotFoundException,
  Param, Patch,
  Post,
  Put,
} from '@nestjs/common';
import {getManager, getRepository} from "typeorm";
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { BooksService } from '../books/books.service';
import { Users } from './users.entity';
import { Books } from '../books/books.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('Daniil Klimov')
@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly booksService: BooksService,
              private readonly usersService: UsersService) {
  }

  // Получение всего списка пользователей
  @Get()
  @ApiOperation({ summary: 'Search all users' })
  getAll() : Promise<Users[]> {
    return this.usersService.findAll();
  }

  // Получение информации о конкретном пользователем
  @Get(':id')  // Поиск по конкретному id
  @ApiOperation({ summary: 'Search user by id' })
  @ApiResponse({
    status: 200,
    description: 'User searched',
    type: Users,
  })
  async getOne(@Param('id') id: string) : Promise<Users> {
    const user = this.usersService.findOne(id);
    /**const book = await getRepository(Books);
    book.createQueryBuilder()
      .where("user_id = :id", {id : parseInt(id)})
      .getMany();

    /**for (let i = 0; i < Books.length; i++) {
      const book = await this.booksService.findOne('i');
      if (book.user.id === parseInt(id)) {
        console.log(book.title);
      }
    }**/
    if (user === undefined) {
      throw new HttpException(
        'User with id = ' + id + ' not exists',
        HttpStatus.NOT_FOUND);
    }
    return user;  // Возвращение полученных данных из таблицы
  }

  // Создание пользователя
  @Post()
  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: Users,
  })
  create(@Body() createUsersDto : CreateUsersDto) : Promise<Users> {
    const user = new Users();
    user.Firstname = createUsersDto.Firstname;
    user.Secondname = createUsersDto.Secondname;
    if (createUsersDto.Sub !== undefined) {
      user.Sub = createUsersDto.Sub;  // При создании нового пользователя подписка не подключена
    }
    return this.usersService.create(user);
  }

  // Удаление пользователя
  @Delete(':id')
  @ApiOperation({ summary: 'Deleting a user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    type: Users,
  })
  remove(@Param('id') id : string) : Promise<void>{
    return this.usersService.remove(id)
  }

  // Изменение информации о пользователе
  @Put(':id')
  @ApiOperation({ summary: 'User change' })
  @ApiResponse({
    status: 200,
    description: 'User changed',
    type: Users,
  })
  async update(
    @Param('id') id : string,
    @Body() {Firstname, Secondname, Sub = false}: UpdateUsersDto) : Promise<Users> {
    const user = await this.usersService.findOne(id);
    if (user === undefined) {
      throw new HttpException(
        'User with id = ' + id + ' not exists',
        HttpStatus.NOT_FOUND);
    }
    user.Firstname = Firstname;  // Обновление имени в таблице
    user.Secondname = Secondname;  // Обновление фамилии в таблице
    user.Sub = Sub;  // Обновление подписки в таблице
    return this.usersService.update(user);
  }

  // Добавление пользователю подписки
  @Patch(':id')
  @ApiOperation({ summary: 'Adding a subscription' })
  @ApiResponse({
    status: 200,
    description: 'Subscription added',
    type: Users,
  })
  async updatesub(
    @Param('id') id : string,
    @Body() {Sub = true} : UpdateUsersDto) :Promise<Users> { // Установка подписки в значение True
    const user = await  this.usersService.findOne(id);
    if (user === undefined) {  // Если пользователь не найден выдаём ошибку
      throw new HttpException(
        'User with id = ' + id + ' not exists',
        HttpStatus.NOT_FOUND);
    }
    user.Sub = Sub;  // Обновление поля Sub в таблице данных
    return this.usersService.updatesub(user);
  }

}
