import request from '../request';

type GetAllCategoriesParams = {
  companyId: number;
};

export function getAllCategories({
  companyId,
}: GetAllCategoriesParams): Promise<any> {
  return request.get('categories', { params: { company_id: companyId } });
}
