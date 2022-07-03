import request from '../request';

type GetCommentsParams = {
  size?: number;
  offset?: number;
  scoreOnly?: boolean;
  idea_id: string;
};

type SubmitCommentProps = {
  score: number;
  description: string;
  user_id: string;
  company_id: string;
  idea_id: string;
};

export function getComments({
  scoreOnly = false,
  idea_id,
}: GetCommentsParams): Promise<any> {
  return request.get('comments', {
    params: {
      scoreOnly,
      idea_id,
    },
  });
}

export function submitComment({
  score,
  description,
  user_id,
  company_id,
  idea_id,
}: SubmitCommentProps): Promise<any> {
  return request.post('comments', {
    score,
    description,
    user_id,
    company_id,
    idea_id,
  });
}
