import { Company } from '../models/Company';

interface CompanyRepository {
  create(company: Company): Promise<Company>;
}

export default CompanyRepository;
