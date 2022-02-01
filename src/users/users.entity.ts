import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from '../books/books.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @ApiProperty({
    description: 'ID user in Table',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Firstname user in Table',
    type: String,
  })
  @Column()
  Firstname: string;

  @ApiProperty({
    description: 'Secondname user in Table',
    type: String,
  })
  @Column()
  Secondname: string;

  @ApiProperty({
    description: 'Subscription user in Table',
    type: Boolean,
    default: false,
  })
  @Column({default: false})
  Sub: boolean;

  @ApiProperty({
    description: 'Table link "One to Many"',
    type: [Books],
  })
  @OneToMany(() => Books, books => books.user, {
    cascade: true })
  books : Books[];

}