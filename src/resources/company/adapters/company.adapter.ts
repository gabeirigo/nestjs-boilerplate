import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/configs/prisma/PrismaService';
import { DatabaseError } from 'src/errors/DatabaseError';
import { Company } from '../models/Company';
import CompanyRepository from '../repositories/company-repository.interface';

@Injectable()
class CompanyAdapter implements CompanyRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Company): Promise<Company> {
    try {
      return await this.prismaService.company.create({ data });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  }
}

export default CompanyAdapter;
