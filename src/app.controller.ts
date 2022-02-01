import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Books } from './books/books.entity';

@ApiBearerAuth('Daniil Klimov')
@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Home Page' })
  @ApiResponse({
    status: 200,
    description: 'Hello',
    type: Books,
  })
  getHello(): string {
    return 'Hello NestJS!';
  }
}
