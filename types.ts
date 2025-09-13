
export interface CustomizationState {
  brandName: string;
  brandNameSuffix: string;
  primaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

export enum BookingStatus {
  Confirmed = 'पुष्ट',
  Pending = 'लंबित',
  Cancelled = 'रद्द',
}

export interface Booking {
  id: string;
  customer: string;
  hotel: string;
  date: string;
  amount: number;
  status: BookingStatus;
}

export enum CommissionStatus {
    Paid = 'भुगतान हुआ',
    Pending = 'भुगतान बाकी'
}

export interface Commission {
    hotel: string;
    bookings: number;
    totalAmount: number;
    commissionPercentage: number;
    commissionAmount: number;
    status: CommissionStatus;
}

export interface SubscriptionPlan {
    name: string;
    price: number;
    features: string[];
    nonFeatures?: string[];
    isPopular: boolean;
}

export enum OTAName {
    BookingCom = 'Booking.com',
    Agoda = 'Agoda',
    Goibibo = 'Goibibo',
    MakeMyTrip = 'MakeMyTrip'
}

export interface OTAIntegration {
    name: OTAName;
    description: string;
    connected: boolean;
}
