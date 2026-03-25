import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  EMPLEADO = 'empleado',
  CAJERO = 'cajero',
  CLIENTE = 'cliente',
}

export class CreateUserDto {
  @ApiProperty({ description: 'ID del usuario (opcional)', required: false })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ description: 'Nombre de usuario' })
  @IsNotEmpty({ message: 'El bombre de usuario debe ser un texto' })
  @IsString({ message: 'El nombre de usuario es obligatorio' })
  username: string;

  @ApiProperty({ description: 'Contraseña' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ description: 'Correo electrónico' })
  @IsEmail({}, { message: 'El formato del correo es inválido' })
  email: string;

  @ApiProperty({
    description: 'Rol del usuario',
    enum: UserRole,
    default: UserRole.CLIENTE,
  })
  @IsEnum(UserRole, { message: 'El rol no es válido' })
  role: UserRole;
}
