import { Module } from '@nestjs/common';
import { PrismaService } from 'src/configs/prisma/PrismaService';
import CompanyAdapter from './adapters/company.adapter';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyAdapter, PrismaService]
})
export class CompanyModule {}
