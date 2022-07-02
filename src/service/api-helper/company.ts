import request from '../request';

type SubmitCompanyArgs = {
  name: string;
  owner_national_id: string;
  owner_first_name: string;
  owner_last_name: string;
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
