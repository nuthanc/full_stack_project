import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

// Auth API
export const loginUser = async (username: string, password: string) => {
  const response = await apiClient.post('/login', { username, password });
  return response.data;
};

// Booking APIs
export const fetchCities = async () => {
  const response = await apiClient.get('/cities');
  return response.data;
};

export const fetchMovies = async (city: string) => {
  const response = await apiClient.get(
    `/movies?city=${encodeURIComponent(city)}`
  );
  return response.data;
};

export const fetchTheatres = async (city: string, movieId: number) => {
  const response = await apiClient.get(
    `/theatres?city=${encodeURIComponent(city)}&movieId=${movieId}`
  );
  return response.data;
};

export const fetchShows = async (theatreId: number, movieId: number) => {
  const response = await apiClient.get(
    `/shows?theatreId=${theatreId}&movieId=${movieId}`
  );
  return response.data;
};

export const fetchSeats = async (showId: number) => {
  const response = await apiClient.get(`/seats?showId=${showId}`);
  return response.data;
};

export const reserveSeats = async (showId: number, seats: string[]) => {
  const response = await apiClient.post('/reserve', { showId, seats });
  return response.data;
};

export const processPayment = async (
  bookingId: number,
  paymentDetails: any
) => {
  const response = await apiClient.post('/payment', {
    bookingId,
    ...paymentDetails,
  });
  return response.data;
};

export const fetchBookingDetails = async (userId: number) => {
  const response = await apiClient.get(`/bookings?userId=${userId}`);
  return response.data;
};

// Admin APIs
export const addTheatre = async (theatreData: any) => {
  const response = await apiClient.post('/admin/theatres', theatreData);
  return response.data;
};

export const addHall = async (hallData: any) => {
  const response = await apiClient.post('/admin/halls', hallData);
  return response.data;
};

export const addMovie = async (movieData: any) => {
  const response = await apiClient.post('/admin/movies', movieData);
  return response.data;
};
