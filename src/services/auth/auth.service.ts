import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new UnauthorizedException('Error al registrar el usuario', msg);
    }
  }

  async login(user: User): Promise<{ access_token: string }> {
    try {
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new UnauthorizedException('Credenciales inválidas', msg);
    }
  }
}
