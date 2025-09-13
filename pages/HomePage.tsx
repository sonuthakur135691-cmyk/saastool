import React from 'react';
import type { CustomizationState, Hotel } from '../types';
import { HOTELS } from '../constants';
import { MapPin, Star } from 'lucide-react';

interface HomePageProps {
  customization: CustomizationState;
}

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
      <p className="text-sm text-gray-500 flex items-center mt-1">
        <MapPin size={14} className="mr-1" /> {hotel.location}
      </p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold text-gray-900">₹{hotel.price.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/रात</span></p>
        <div className="flex items-center">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-semibold text-gray-700">{hotel.rating}</span>
          <span className="ml-2 text-sm text-gray-500">({hotel.reviews} समीक्षाएं)</span>
        </div>
      </div>
    </div>
  </div>
);

export const HomePage: React.FC<HomePageProps> = ({ customization }) => {
  const heroStyle = {
    backgroundColor: customization.primaryColor,
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section style={heroStyle} className="text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">{customization.heroTitle}</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{customization.heroSubtitle}</p>
        <div className="mt-8">
            <input 
                type="text" 
                placeholder="एक गंतव्य या होटल खोजें..." 
                className="w-full max-w-lg mx-auto p-4 rounded-full text-gray-800"
            />
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">विशेष रुप से प्रदर्शित होटल</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOTELS.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>
      
      {/* Footer */}
       <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} {customization.brandName} {customization.brandNameSuffix}. सर्वाधिकार सुरक्षित।</p>
        </div>
       </footer>
    </div>
  );
};
