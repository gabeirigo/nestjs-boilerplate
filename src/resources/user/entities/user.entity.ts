import { $Enums, Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  awsId: string;
  nickname: string;
  role: $Enums.Role;
  Companies?: Prisma.CompanyUncheckedCreateNestedManyWithoutUserInput;
  id: string;
  email: string;
  attributes: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;
  addressId?: string;
  contactId?: string;
  Contacts?: Prisma.ContactUncheckedCreateNestedManyWithoutUserInput;
  Addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
}
