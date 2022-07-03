import request from '../request';

type GetAllCriteriaParams = {
  categoryId: string;
};

export function getAllCriteria({
  categoryId,
}: GetAllCriteriaParams): Promise<any> {
  return request.get('criteria', { params: { category_id: categoryId } });
}
