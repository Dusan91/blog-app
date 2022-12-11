export interface Article {
  id: number;
  title: string;
  body: string;
  user_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
}
export interface Category {
  created_at: string;
  description: string;
  id: number;
  name: string;
  updated_at: string;
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface DataProps {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  links: Link[];
}

export interface CategoriesDataProps extends DataProps {
  data: Category[];
}

export interface ArticlesDataProps extends DataProps {
  data: Article[];
}

export interface CreateEditArticle {
  id?: number;
  title: string;
  body: string;
  category_id: number | null;
}

export interface CreateEditCategory {
  id?: number;
  name: string;
  description: string;
}
