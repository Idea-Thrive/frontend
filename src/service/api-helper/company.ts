import request from '../request';

type SubmitCompanyArgs = {
  name: string;
  owner_national_id: string;
  owner_first_name: string;
  owner_last_name: string;
};

type DeleteCompanyArgs = {
  companyId: string;
};

export function submitCompany({
  name,

  owner_national_id,
  owner_first_name,
  owner_last_name,
}: SubmitCompanyArgs): Promise<any> {
  return request.post('companies', {
    name,
    logo_url: '',
    owner_first_name,
    owner_last_name,
    owner_national_id,
  });
}

export function getAllCompanies(): Promise<any> {
  return request.get('companies');
}

export function deleteCompany({ companyId }: DeleteCompanyArgs): Promise<any> {
  return request.delete(`companies/${companyId}`);
}
