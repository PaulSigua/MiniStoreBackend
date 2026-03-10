import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from '../entity/user.entity';

@ApiTags('Users') //  Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario con rol específico' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
