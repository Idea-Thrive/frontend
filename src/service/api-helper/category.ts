import request from '../request';

type GetAllCategoriesParams = {
  companyId: number;
};

type CreateCategory = {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
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
  description,
}: CreateCategory): Promise<any> {
  return request.post('categories', {
    name,
    description,
  });
}

export function deleteCategory({ id }: DeleteCategory): Promise<any> {
  return request.delete(`categories/${id}`);
}
