import request from '../request';

type CreateIdeaParam = {
  title: string;
  category_id: string;
  description: string;
  creator_id: string;
  company_id: string;
};

type DeleteIdeaParams = {
  ideaId: string;
};

export function createIdea({
  title,
  category_id,
  description,
  creator_id,
  company_id,
}: CreateIdeaParam): Promise<any> {
  return request.post('ideas', {
    title,
    category_id,
    description,
    creator_id,
    company_id,
  });
}

export function deleteIdea({ ideaId }: DeleteIdeaParams): Promise<any> {
  return request.delete(`ideas/${ideaId}`);
}
