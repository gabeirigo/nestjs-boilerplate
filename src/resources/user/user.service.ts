import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/requests/create-user.dto';
import { UpdateUserDto } from './dto/requests/update-user.dto';

import { User } from './entities/user.entity';

import { Request } from 'express';
import { PrismaService } from 'src/configs/prisma/PrismaService';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto
    };

    const createUser = await this.prisma.user.create({ data });

    return {
      ...createUser
    };
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return {
      ...user
    };
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return {
      ...user
    };
  }

  async findByAwsId(awsId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { awsId } });
    return {
      ...user
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const data: Prisma.UserUpdateInput = {
      ...updateUserDto
    };

    const user = await this.prisma.user.update({ data, where: { id } });

    return {
      ...user
    };
  }

  async remove(id: string): Promise<User> {
    const user = await this.prisma.user.delete({ where: { id } });
    return {
      ...user
    };
  }

  async requestUserByToken(request: Request): Promise<User> {
    const user = await this.findByAwsId(request.user['sub']);
    return {
      ...user
    };
  }
}
