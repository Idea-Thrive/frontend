import request from '../request';

type GetIdeasParams = {
  companyId: number;
  category: string;
  size: number;
  offset: number;
};

export function getIdeas({
  companyId,
  category,
  size,
  offset,
}: GetIdeasParams): Promise<any> {
  return request.get('ideas', {
    params: { company_id: companyId, category, size, offset },
  });
}
