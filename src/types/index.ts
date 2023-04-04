export type Resource = {
  id: number;
  title: string;
  description: string;
  category: Category;
  image: string;
  slug: string;
  date: string;
  author: Author;
  html: any;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type Author = {
  id: number;
  name: string;
  slug: string;
  image: string;
};
