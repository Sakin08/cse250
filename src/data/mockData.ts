import { TravelPackage, Booking } from '../types';

export const mockPackages: TravelPackage[] = [
  {
    id: '1',
    title: 'Tropical Paradise Getaway',
    description: 'Experience the beauty of tropical beaches and lush rainforests in this all-inclusive package. Enjoy snorkeling, hiking, and relaxing spa treatments.',
    location: 'Bali, Indonesia',
    price: 1299,
    duration: 7,
    imageUrl: 'https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    inclusions: [
      'Airport transfers',
      'Luxury accommodation',
      'Daily breakfast and dinner',
      'Guided tours',
      'Snorkeling equipment'
    ],
    ratings: [
      {
        id: 'r1',
        userId: 'u2',
        userName: 'Sarah Johnson',
        stars: 5,
        comment: 'Absolutely amazing experience! The beaches were pristine and the staff was incredibly helpful.',
        date: '2023-06-15'
      },
      {
        id: 'r2',
        userId: 'u3',
        userName: 'Michael Rodriguez',
        stars: 4,
        comment: 'Great package overall. The food was delicious and the activities were well organized.',
        date: '2023-05-22'
      }
    ],
    availableDates: [
      '2024-09-15',
      '2024-10-05',
      '2024-10-20',
      '2024-11-12'
    ]
  },
  {
    id: '2',
    title: 'European Cultural Tour',
    description: 'Discover the rich history and culture of Europe\'s most iconic cities. Visit museums, historical landmarks, and enjoy authentic cuisine.',
    location: 'Paris, Rome, Barcelona',
    price: 2499,
    duration: 12,
    imageUrl: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    inclusions: [
      'Inter-city transportation',
      'Guided city tours',
      'Museum passes',
      '4-star accommodation',
      'Daily breakfast'
    ],
    ratings: [
      {
        id: 'r3',
        userId: 'u1',
        userName: 'James Wilson',
        stars: 5,
        comment: 'This tour exceeded my expectations! The guides were knowledgeable and the itinerary was perfect.',
        date: '2023-07-03'
      }
    ],
    availableDates: [
      '2024-09-10',
      '2024-10-15',
      '2024-11-05'
    ]
  },
  {
    id: '3',
    title: 'Mountain Hiking Adventure',
    description: 'Challenge yourself with an exhilarating hiking adventure in the majestic Swiss Alps. Breathtaking views and unparalleled natural beauty await.',
    location: 'Swiss Alps, Switzerland',
    price: 1799,
    duration: 8,
    imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inclusions: [
      'Expert hiking guides',
      'Mountain lodge accommodation',
      'All meals included',
      'Hiking equipment rental',
      'Safety training'
    ],
    ratings: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Emily Chen',
        stars: 5,
        comment: 'An unforgettable experience! The mountains were spectacular and the guides were professional.',
        date: '2023-08-12'
      },
      {
        id: 'r5',
        userId: 'u5',
        userName: 'David Smith',
        stars: 4,
        comment: 'Challenging but rewarding hikes. Beautiful scenery and great companions.',
        date: '2023-07-28'
      }
    ],
    availableDates: [
      '2024-09-05',
      '2024-09-25',
      '2024-10-10'
    ]
  },
  {
    id: '4',
    title: 'African Safari Experience',
    description: 'Embark on an unforgettable journey through the African savanna. Witness the Big Five in their natural habitat and enjoy luxury camping.',
    location: 'Serengeti, Tanzania',
    price: 3299,
    duration: 10,
    imageUrl: 'https://images.pexels.com/photos/259411/pexels-photo-259411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    inclusions: [
      'Safari game drives',
      'Luxury tented accommodation',
      'All meals and drinks',
      'Professional wildlife guides',
      'Conservation contribution'
    ],
    ratings: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'Lisa Thompson',
        stars: 5,
        comment: 'The safari exceeded all my expectations! We saw all the Big Five and the accommodations were luxurious.',
        date: '2023-06-30'
      }
    ],
    availableDates: [
      '2024-08-20',
      '2024-09-15',
      '2024-10-05'
    ]
  },
  {
    id: '5',
    title: 'Ancient Wonders of Asia',
    description: 'Explore the mystical temples and ancient civilizations of Southeast Asia. Visit Angkor Wat, Bagan, and other architectural marvels.',
    location: 'Cambodia, Myanmar, Thailand',
    price: 2199,
    duration: 14,
    imageUrl: 'https://images.pexels.com/photos/6272228/pexels-photo-6272228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inclusions: [
      'All domestic flights',
      'Cultural tour guides',
      'Temple entrance fees',
      'Boutique hotel accommodation',
      'Daily breakfast and lunch'
    ],
    ratings: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Robert Johnson',
        stars: 4,
        comment: 'A fascinating journey through time. The temples were incredible and the local cuisine was delicious.',
        date: '2023-05-18'
      },
      {
        id: 'r8',
        userId: 'u8',
        userName: 'Amanda Lee',
        stars: 5,
        comment: 'This trip was a dream come true! The ancient temples were breathtaking and our guide was so knowledgeable.',
        date: '2023-07-10'
      }
    ],
    availableDates: [
      '2024-09-20',
      '2024-10-25',
      '2024-11-15'
    ]
  },
  {
    id: '6',
    title: 'Caribbean Cruise Deluxe',
    description: 'Sail through the crystal-clear waters of the Caribbean on a luxury cruise. Visit multiple islands, enjoy water sports, and relax on pristine beaches.',
    location: 'Caribbean Islands',
    price: 1999,
    duration: 9,
    imageUrl: 'https://images.pexels.com/photos/2549083/pexels-photo-2549083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    inclusions: [
      'Luxury cabin accommodation',
      'All meals and premium drinks',
      'Island excursions',
      'Onboard entertainment',
      'Water sports equipment'
    ],
    ratings: [
      {
        id: 'r9',
        userId: 'u9',
        userName: 'Thomas Green',
        stars: 5,
        comment: 'The perfect vacation! The ship was incredible and the island stops were paradise on earth.',
        date: '2023-08-05'
      }
    ],
    availableDates: [
      '2024-08-30',
      '2024-09-20',
      '2024-10-15'
    ]
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    userId: '1',
    packageId: '1',
    date: '2024-09-15',
    guests: 2,
    totalPrice: 2598,
    status: 'confirmed',
    createdAt: '2024-06-05T12:30:00Z'
  },
  {
    id: 'b2',
    userId: '1',
    packageId: '4',
    date: '2024-10-05',
    guests: 1,
    totalPrice: 3299,
    status: 'pending',
    createdAt: '2024-06-10T09:15:00Z'
  }
];