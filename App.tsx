import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CustomizationPanel } from './components/CustomizationPanel';
import { AuthModal } from './components/AuthModal';
import type { CustomizationState } from './types';
import { Settings, LogIn, UserCircle, LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'dashboard'>('home');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manages user auth state

  const [customization, setCustomization] = useState<CustomizationState>({
    brandName: 'Sonic',
    brandNameSuffix: 'Hotel Pro',
    primaryColor: '#3b82f6',
    heroTitle: 'अपनी अगली आरामदायक छुट्टी पाएं',
    heroSubtitle: 'शानदार होटलों, रिज़ॉर्ट्स और बहुत कुछ पर सर्वोत्तम मूल्य खोजें। सुरक्षित रूप से और आसानी से बुक करें।',
  });

  const handleCustomizationChange = (newValues: Partial<CustomizationState>) => {
    setCustomization(prev => ({ ...prev, ...newValues }));
  };

  const headerStyle = {
    '--primary-color': customization.primaryColor,
  } as React.CSSProperties;

  return (
    <div className="font-sans">
      <header style={headerStyle} className="bg-[var(--primary-color)] text-white shadow-md sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" onClick={() => setView('home')} className="text-2xl font-bold">
                {customization.brandName}<span className="font-light">{customization.brandNameSuffix}</span>
              </a>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
                {isAuthenticated && view === 'home' && (
                     <button onClick={() => setView('dashboard')} className="flex items-center text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10">
                        <LayoutDashboard size={20} />
                        <span className="hidden sm:inline ml-2 font-medium">डैशबोर्ड</span>
                     </button>
                )}
                {isAuthenticated && view === 'dashboard' && (
                     <button onClick={() => setView('home')} className="flex items-center text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10 font-medium text-sm sm:text-base">
                        होमपेज
                     </button>
                )}
                 <button onClick={() => setIsPanelOpen(true)} className="p-2 rounded-full hover:bg-white/20 transition-colors" aria-label="Customize theme">
                    <Settings size={20} />
                </button>
                {isAuthenticated ? (
                    <button onClick={() => setIsAuthenticated(false)} className="p-2 rounded-full hover:bg-white/20 transition-colors" aria-label="User account">
                       <UserCircle size={24} />
                    </button>
                ) : (
                    <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10">
                        <LogIn size={20} />
                        <span className="hidden sm:inline ml-2 font-medium">लॉग इन करें</span>
                    </button>
                )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        {view === 'home' ? <HomePage customization={customization} /> : <AdminDashboard />}
      </main>
      
      <CustomizationPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        customization={customization}
        onCustomizationChange={handleCustomizationChange}
      />
      
      {/* AuthModal visibility is controlled by isAuthModalOpen state */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => {
            setIsAuthModalOpen(false);
            // Simulate successful login to update UI
            if (!isAuthenticated) setIsAuthenticated(true);
        }} 
       />

    </div>
  );
};

export default App;