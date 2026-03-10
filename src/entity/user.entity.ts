import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { UserRole } from 'src/dto/create-user.dto';

import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'ID único del usuario' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre de usuario' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: 'Correo electrónico' })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({ description: 'Rol del usuario', enum: UserRole })
  @Column({
    type: 'varchar', // SQLite not has ENUM native, use varchar
    default: UserRole.CLIENTE,
  })
  role: UserRole;

  @ApiProperty({ description: 'Estado de la cuenta' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  createdAt: Date;
}
