import { Prisma } from '@prisma/client';

export class CompanyEntity implements Prisma.CompanyUncheckedCreateInput {
  id?: string;
  companyName: string;
  identificationNumber: string;
  userId: string;
}
