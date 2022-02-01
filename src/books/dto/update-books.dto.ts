import { ApiProperty } from '@nestjs/swagger';

export class UpdateBooksDto {
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