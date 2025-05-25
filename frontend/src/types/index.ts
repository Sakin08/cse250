export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Rating {
  id: string;
  userId: string;
  userName: string;
  stars: number;
  comment: string;
  date: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: number;
  imageUrl: string;
  featured: boolean;
  inclusions: string[];
  ratings: Rating[];
  availableDates: string[];
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  date: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  duration?: number;
  minRating?: number;
}