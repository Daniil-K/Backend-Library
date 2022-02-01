import { ApiProperty } from '@nestjs/swagger';

export class AddToUserDto {

  @ApiProperty({
    description: 'ID user',
  })
  readonly User : string
}