import { Injectable } from '@nestjs/common';
import CompanyAdapter from './adapters/company.adapter';
import { CreateCompanyDto } from './dto/requests/create-company.dto';
import { UpdateCompanyDto } from './dto/requests/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private companyAdapter: CompanyAdapter) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyAdapter.create(createCompanyDto);
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    console.log(updateCompanyDto);
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
