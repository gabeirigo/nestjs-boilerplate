import { IsString } from 'class-validator';
import { CompanyEntity } from '../../entities/company.entity';

export class CreateCompanyDto extends CompanyEntity {
  @IsString()
  companyName: string;

  @IsString()
  userId: string;

  @IsString()
  identificationNumber: string;
}
