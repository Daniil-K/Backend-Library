import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {

  @ApiProperty({
    description: 'Firstname user',
  })
  readonly Firstname: string

  @ApiProperty({
    description: 'Secondname user',
  })
  readonly Secondname: string

  @ApiProperty({
    description: 'Subscription',
    default: false,
  })
  readonly Sub : boolean

}