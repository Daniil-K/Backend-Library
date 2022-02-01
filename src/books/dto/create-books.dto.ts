import { ApiProperty } from '@nestjs/swagger';

export class CreateBooksDto {
  @ApiProperty({
    description: 'Title book',
  })
  readonly title: string

  @ApiProperty({
    description: 'Book employment',
    default: false,
  })
  readonly employ : boolean
}