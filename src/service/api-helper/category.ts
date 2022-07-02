import request from '../request';

type GetAllCategoriesParams = {
  companyId: number;
};

type CreateCategory = {
  name: string;
  color?: string;
  company_id: string;
};

type DeleteCategory = {
  id: string;
};

export function getAllCategories({
  companyId,
}: GetAllCategoriesParams): Promise<any> {
  return request.get('categories', { params: { company_id: companyId } });
}

export function createCategory({
  name,
  color = 'blue',
  company_id,
}: CreateCategory): Promise<any> {
  return request.post('categories', {
    name,
    color,
    company_id,
  });
}

export function deleteCategory({ id }: DeleteCategory): Promise<any> {
  return request.delete(`categories/${id}`);
}
