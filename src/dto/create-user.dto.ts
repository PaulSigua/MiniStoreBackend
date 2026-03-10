import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  EMPLEADO = 'empleado',
  CAJERO = 'cajero',
  CLIENTE = 'cliente',
}

export class CreateUserDto {
  @ApiProperty({ description: 'ID del usuario (opcional)', required: false })
  id?: string;

  @ApiProperty({ description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ description: 'Contraseña' })
  password: string;

  @ApiProperty({ description: 'Correo electrónico' })
  email: string;

  @ApiProperty({
    description: 'Rol del usuario',
    enum: UserRole,
    default: UserRole.CLIENTE,
  })
  role: UserRole;
}
