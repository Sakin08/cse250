import React, { createContext, useState, useContext } from 'react';
import { TravelPackage, Rating } from '../types';
import { mockPackages } from '../data/mockData';

interface DestinationsContextType {
  packages: TravelPackage[];
  featuredPackages: TravelPackage[];
  getPackageById: (id: string) => TravelPackage | undefined;
  addRating: (packageId: string, rating: Rating) => void;
  searchPackages: (query: string, filters: any) => TravelPackage[];
  addPackage: (newPackage: Omit<TravelPackage, 'id'>) => void;
  updatePackage: (id: string, packageData: Partial<TravelPackage>) => void;
  deletePackage: (id: string) => void;
}

const DestinationsContext = createContext<DestinationsContextType | undefined>(undefined);

export const useDestinations = () => {
  const context = useContext(DestinationsContext);
  if (context === undefined) {
    throw new Error('useDestinations must be used within a DestinationsProvider');
  }
  return context;
};

export const DestinationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<TravelPackage[]>(mockPackages);

  const featuredPackages = packages
    .filter(pkg => pkg.featured)
    .sort((a, b) => {
      // Sort by average rating
      const aRating = a.ratings.reduce((acc, r) => acc + r.stars, 0) / a.ratings.length || 0;
      const bRating = b.ratings.reduce((acc, r) => acc + r.stars, 0) / b.ratings.length || 0;
      return bRating - aRating;
    })
    .slice(0, 4);

  const getPackageById = (id: string) => {
    return packages.find(pkg => pkg.id === id);
  };

  const addRating = (packageId: string, rating: Rating) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === packageId 
          ? { ...pkg, ratings: [...pkg.ratings, rating] }
          : pkg
      )
    );
  };

  const searchPackages = (query: string, filters: any) => {
    let filtered = [...packages];
    
    // Search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(pkg => 
        pkg.title.toLowerCase().includes(lowercaseQuery) || 
        pkg.location.toLowerCase().includes(lowercaseQuery) ||
        pkg.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Price range
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(pkg => pkg.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(pkg => pkg.price <= filters.maxPrice);
    }
    
    // Rating filter
    if (filters.minRating !== undefined) {
      filtered = filtered.filter(pkg => {
        const avgRating = pkg.ratings.length 
          ? pkg.ratings.reduce((sum, r) => sum + r.stars, 0) / pkg.ratings.length 
          : 0;
        return avgRating >= filters.minRating;
      });
    }
    
    // Location filter
    if (filters.location) {
      filtered = filtered.filter(pkg => 
        pkg.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    return filtered;
  };

  const addPackage = (newPackage: Omit<TravelPackage, 'id'>) => {
    const packageToAdd = {
      ...newPackage,
      id: Math.random().toString(36).substring(2, 9),
    };
    setPackages(prev => [...prev, packageToAdd as TravelPackage]);
  };

  const updatePackage = (id: string, packageData: Partial<TravelPackage>) => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === id ? { ...pkg, ...packageData } : pkg
      )
    );
  };

  const deletePackage = (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const value = {
    packages,
    featuredPackages,
    getPackageById,
    addRating,
    searchPackages,
    addPackage,
    updatePackage,
    deletePackage
  };

  return <DestinationsContext.Provider value={value}>{children}</DestinationsContext.Provider>;
};