
import type { Hotel, Booking, Commission, SubscriptionPlan, OTAIntegration } from './types';
import { BookingStatus, CommissionStatus, OTAName } from './types';

export const HOTELS: Hotel[] = [
  {
    id: 1,
    name: 'रॉयल पैलेस होटल',
    location: 'नई दिल्ली',
    price: 2999,
    rating: 4.5,
    reviews: 120,
    imageUrl: 'https://picsum.photos/seed/hotel1/400/300',
  },
  {
    id: 2,
    name: 'सी व्यू रिज़ॉर्ट',
    location: 'गोवा',
    price: 5499,
    rating: 4.8,
    reviews: 250,
    imageUrl: 'https://picsum.photos/seed/hotel2/400/300',
  },
  {
    id: 3,
    name: 'माउंटेन व्यू विला',
    location: 'मनाली',
    price: 4200,
    rating: 4.6,
    reviews: 180,
    imageUrl: 'https://picsum.photos/seed/hotel3/400/300',
  },
    {
    id: 4,
    name: 'लेकसाइड पैराडाइज',
    location: 'उदयपुर',
    price: 3800,
    rating: 4.7,
    reviews: 210,
    imageUrl: 'https://picsum.photos/seed/hotel4/400/300',
  },
  {
    id: 5,
    name: 'सिटी सेंटर Inn',
    location: 'मुंबई',
    price: 3200,
    rating: 4.3,
    reviews: 300,
    imageUrl: 'https://picsum.photos/seed/hotel5/400/300',
  },
  {
    id: 6,
    name: 'हिमालयन रिट्रीट',
    location: 'शिमला',
    price: 4800,
    rating: 4.9,
    reviews: 150,
    imageUrl: 'https://picsum.photos/seed/hotel6/400/300',
  },
];

export const BOOKINGS: Booking[] = [
    { id: '#HB123456', customer: 'राहुल शर्मा', hotel: 'रॉयल पैलेस होटल', date: '12 Aug 2023', amount: 3598, status: BookingStatus.Confirmed },
    { id: '#HB123457', customer: 'प्रिया पाटिल', hotel: 'सी व्यू रिज़ॉर्ट', date: '11 Aug 2023', amount: 5298, status: BookingStatus.Confirmed },
    { id: '#HB123458', customer: 'अमित कुमार', hotel: 'माउंटेन व्यू विला', date: '10 Aug 2023', amount: 7598, status: BookingStatus.Pending },
    { id: '#HB123459', customer: 'नीता मेनन', hotel: 'रॉयल पैलेस होटल', date: '09 Aug 2023', amount: 4198, status: BookingStatus.Confirmed },
    { id: '#HB123460', customer: 'संजय गुप्ता', hotel: 'सी व्यू रिज़ॉर्ट', date: '08 Aug 2023', amount: 6498, status: BookingStatus.Cancelled },
];

export const COMMISSIONS: Commission[] = [
    { hotel: 'रॉयल पैलेस होटल', bookings: 24, totalAmount: 86540, commissionPercentage: 15, commissionAmount: 12981, status: CommissionStatus.Pending },
    { hotel: 'सी व्यू रिज़ॉर्ट', bookings: 18, totalAmount: 102650, commissionPercentage: 12, commissionAmount: 12318, status: CommissionStatus.Paid },
    { hotel: 'माउंटेन व्यू विला', bookings: 8, totalAmount: 60780, commissionPercentage: 10, commissionAmount: 6078, status: CommissionStatus.Pending },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
        name: 'बेसिक',
        price: 499,
        features: ['10 होटल तक', '50 बुकिंग/माह', 'ईमेल समर्थन', 'मूल रिपोर्ट'],
        nonFeatures: ['OTA एकीकरण', 'कस्टम डोमेन'],
        isPopular: false,
    },
    {
        name: 'प्रो',
        price: 999,
        features: ['अनलिमिटेड होटल', '200 बुकिंग/माह', 'प्राथमिक समर्थन', 'उन्नत रिपोर्ट', '1 OTA एकीकरण', '1 कस्टम डोमेन'],
        isPopular: true,
    },
    {
        name: 'एंटरप्राइज',
        price: 1999,
        features: ['अनलिमिटेड होटल', 'अनलिमिटेड बुकिंग', '24/7 समर्थन', 'विस्तृत रिपोर्ट', 'सभी OTA एकीकरण', 'एकाधिक डोमेन'],
        isPopular: false,
    }
];

export const OTA_INTEGRATIONS: OTAIntegration[] = [
    { name: OTAName.BookingCom, description: 'अपने Booking.com खाते से कनेक्ट करें', connected: true },
    { name: OTAName.Agoda, description: 'अपने Agoda खाते से कनेक्ट करें', connected: false },
    { name: OTAName.Goibibo, description: 'अपने Goibibo खाते से कनेक्ट करें', connected: false },
    { name: OTAName.MakeMyTrip, description: 'अपने MakeMyTrip खाते से कनेक्ट करें', connected: false },
];
