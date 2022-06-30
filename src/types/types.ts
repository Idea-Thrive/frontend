export type Category = {
  name: string;
  color: string;
};

export interface Idea {
  title: string;
  creator: string;
  description: string;
  upVotes: number;
  downVotes: number;
  category: Category;
  id: number;
}
