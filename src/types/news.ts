export interface NewsItem {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  date: string;
  image: string;
  images: string[];
  order: number;
  created_at: string;
}

export interface NewsListResponse {
  status: string;
  message: string;
  data: NewsItem[];
  statusCode: number;
}

export interface NewsDetailResponse {
  status: string;
  message: string;
  data: NewsItem;
  statusCode: number;
}

export interface NewsError {
  message: string;
  statusCode: number;
}