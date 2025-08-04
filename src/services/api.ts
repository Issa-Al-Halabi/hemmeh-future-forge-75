import { API_ENDPOINTS } from '@/config/api';
import { NewsListResponse, NewsDetailResponse } from '@/types/news';
import { ContactFormData, ContactResponse } from '@/types/contact';

class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'An error occurred',
      response.status
    );
  }
  
  return data;
}

const getHeaders = (language: string) => ({
  'Accept-Language': language,
  'Content-Type': 'application/json',
});

export const newsApi = {
  getAll: async (language: string): Promise<NewsListResponse> => {
    try {
      const response = await fetch(API_ENDPOINTS.news, {
        headers: getHeaders(language),
      });
      return handleResponse<NewsListResponse>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Failed to fetch news',
        500
      );
    }
  },

  getBySlug: async (slug: string, language: string): Promise<NewsDetailResponse> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.news}/${slug}`, {
        headers: getHeaders(language),
      });
      return handleResponse<NewsDetailResponse>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Failed to fetch news details',
        500
      );
    }
  }
};

export const contactApi = {
  submit: async (data: ContactFormData, language: string): Promise<ContactResponse> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.contact}`, {
        method: 'POST',
        headers: getHeaders(language),
        body: JSON.stringify(data),
      });
      return handleResponse<ContactResponse>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Failed to submit contact form',
        500
      );
    }
  }
};