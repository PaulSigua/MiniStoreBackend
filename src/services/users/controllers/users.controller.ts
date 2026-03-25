import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from 'src/services/users/users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt-auth.guard';

@ApiTags('Users') //  Swagger
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
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
