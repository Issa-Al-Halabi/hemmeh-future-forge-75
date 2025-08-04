export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  status: string;
  message: string;
  data: null;
  statusCode: number;
}