export type ActivityType =
  | 'boat_yacht_tours'
  | 'snorkeling_diving_tours'
  | 'fishing_charter'
  | 'island_hopping'
  | 'whale_dolphin_watching'
  | 'sandbar_tours'
  | 'sunset_dinner_cruises'
  | 'shark_diving'
  | 'stingray_tours'
  | 'sailing_catamaran_gulet_tours'
  | 'eco_tours'
  | 'booze_cruises'
  | 'canoe_kayak_tours'
  | 'paddleboard_activity';

export interface Listing {
  id: number;
  title: string;
  activities: ActivityType[];
  coverPhoto: {
    small: string;
    public: string;
    thumbnail: string;
  };
  capacity: number;
  lengthFt: number;
  minPrice: {
    value: number;
    display: string;
    currency: string;
  };
  rating: {
    count: number;
    score: number;
  };
  thirdPartyReviews?: {
    source: string;
    reviewCount: number;
    reviewScore: number;
  };
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    country: string;
  };
  description: string;
  boatCategory: string;
  boatType: string;
  listingType: 'boat_rental' | 'boat_tour';
  isInstantBook: boolean;
  isFreeCancellation: boolean;
  freeCancellationDays: number;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOperator?: boolean;
}

export interface Booking {
  id: string;
  listingId: number;
  listingTitle: string;
  date: string;
  guests: number;
  activity: ActivityType;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: string;
}
