import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userEmailExists: UserEntity =
      await this.usersRepository.findOneByEmail(createUserDto.email);

    if (userEmailExists) {
      throw new BadRequestException('Email already exists');
    }

    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const userExists: UserEntity = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }

    return userExists;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const userEmailExists: UserEntity =
      await this.usersRepository.findOneByEmail(updateUserDto.email);

    if (userEmailExists && userEmailExists.id !== id) {
      throw new BadRequestException('Email already exists');
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    const userExists: UserEntity = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }

    await this.usersRepository.remove(id);
  }
}
