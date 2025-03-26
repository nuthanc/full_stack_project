import axios from 'axios';

const apiUrl = import.meta.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiUrl || 'http://localhost:3000/api',
  timeout: 10000,
});

// Generic API response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Interfaces for our endpoints
export interface City {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Theatre {
  id: number;
  name: string;
  city_id: number;
  created_at: string;
  updated_at: string;
}

export interface Movie {
  id: number;
  title: string;
  description?: string;
  release_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Show {
  id: number;
  time: string;
  theatre_id: number;
  movie_id: number;
  created_at: string;
  updated_at: string;
}

export interface Seat {
  id: number;
  number: string;
  available: boolean;
  show_id: number;
  created_at: string;
  updated_at: string;
}

// Auth / User APIs
export const signUpUser = async (
  username: string,
  email: string,
  password: string
): Promise<any> => {
  const response = await apiClient.post<ApiResponse<any>>('/signup', {
    username,
    email,
    password,
  });
  return response.data.data;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<any> => {
  const response = await apiClient.post<ApiResponse<any>>('/login', {
    username,
    password,
  });
  return response.data.data;
};

// Booking APIs
export const fetchCities = async (): Promise<City[]> => {
  const response = await apiClient.get<ApiResponse<City[]>>('/cities');
  return response.data.data;
};

export const fetchMovies = async (city: string): Promise<Movie[]> => {
  const response = await apiClient.get<ApiResponse<Movie[]>>(
    `/movies?city=${encodeURIComponent(city)}`
  );
  return response.data.data;
};

export const fetchTheatres = async (
  city: string,
  movieId: number
): Promise<Theatre[]> => {
  const response = await apiClient.get<ApiResponse<Theatre[]>>(
    `/theatres?city=${encodeURIComponent(city)}&movieId=${movieId}`
  );
  return response.data.data;
};

export const fetchShows = async (
  theatreId: number,
  movieId: number
): Promise<Show[]> => {
  const response = await apiClient.get<ApiResponse<Show[]>>(
    `/shows?theatreId=${theatreId}&movieId=${movieId}`
  );
  return response.data.data;
};

export const fetchSeats = async (showId: number): Promise<Seat[]> => {
  const response = await apiClient.get<ApiResponse<Seat[]>>(
    `/seats?showId=${showId}`
  );
  return response.data.data;
};

export const reserveSeats = async (
  showId: number,
  seats: string[]
): Promise<any> => {
  const response = await apiClient.post<ApiResponse<any>>('/reserve', {
    showId,
    seats,
  });
  return response.data.data;
};

export const processPayment = async (
  bookingId: number,
  paymentDetails: any
): Promise<any> => {
  const response = await apiClient.post<ApiResponse<any>>('/payment', {
    bookingId,
    ...paymentDetails,
  });
  return response.data.data;
};

export const fetchBookingDetails = async (userId: number): Promise<any> => {
  const response = await apiClient.get<ApiResponse<any>>(
    `/bookings?userId=${userId}`
  );
  return response.data.data;
};

// Admin APIs
export const addTheatre = async (theatreData: any): Promise<any> => {
  const response = await apiClient.post<ApiResponse<any>>(
    '/admin/theatres',
    theatreData
  );
  return response.data.data;
};

export const addHall = async (hallData: any): Promise<any> => {
  const response = await apiClient.post<ApiResponse<any>>(
    '/admin/halls',
    hallData
  );
  return response.data.data;
};

export const addMovie = async (movieData: any): Promise<any> => {
  const response = await apiClient.post<ApiResponse<any>>(
    '/admin/movies',
    movieData
  );
  return response.data.data;
};
