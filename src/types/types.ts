export type Category = {
  id: string;
  name: string;
  // color: string;
};

export interface Idea {
  title: string;
  category_name: string;
  description: string;
  score: number;
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

export type Company = {
  id: string;
  name: string;
  logo_url: string;
  owner_national_id: string;
  owner_first_name: string;
  owner_last_name: string;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  company_id: string;
  created_at: string;
  description: string;
  id: string;
  score: number;
  updated_at: string;
  user_id: string;
};

export type Criteria = {
  name: string;
  category_id: string;
};
