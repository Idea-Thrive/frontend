export type Category = {
  name: string;
  // color: string;
};

export interface Idea {
  title: string;
  category: string;
  description: string;
  up_vote_count: number;
  down_vote_count: number;
  creator_id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export enum SortingOption {
  TOP_RATED = 'topRated',
  NEWEST = 'newest',
}

export enum Status {
  APPROVED = 'approved',
}

export enum Role {
  EMPLOYEE = 'employee',
  EMPLOYER = 'employer',
}
