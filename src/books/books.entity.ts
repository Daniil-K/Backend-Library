import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'ID book in Table',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Title book in Table',
    type: String,
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Employment book in Table',
    type: Boolean,
    default: false,
  })
  @Column({default: false})
  employ: boolean;

  @ApiProperty({
    description: 'Table link "Many to One"',
    type: Users,
  })
  @ManyToOne(() => Users, user => user.books)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
  user: Users;

}