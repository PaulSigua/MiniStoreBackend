import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'El formato del correo es inválido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'password' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
