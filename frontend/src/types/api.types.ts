export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // page en spring boot
  size: number;
}

export type RequestStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
