import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entity/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, ...userData } = createUserDto;

    this.logger.log(
      `Intentado crear un nuevo usuario: ${(userData.username, email)}`,
    );

    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username: userData.username }],
    });

    if (existingUser) {
      const field =
        existingUser.email === email ? 'correo' : 'nombre de usuario';
      this.logger.warn('Intento de registro fallido: ', field);
      throw new BadRequestException(`El ${field} ya está registrado`);
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = this.userRepository.create({
        ...userData,
        email,
        username: userData.username,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(newUser);

      this.logger.log(`Usuario creado exitosamente: ${savedUser.id}`);

      return savedUser;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error al crear el usuario: ${msg}`);
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
