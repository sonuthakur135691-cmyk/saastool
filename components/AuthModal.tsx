import React, { useState } from 'react';
import { X } from 'lucide-react';
import { IconGoogle, IconGitHub } from './icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset state on close
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setIsLogin(true);
    onClose();
  };
  
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email) {
      newErrors.email = 'ईमेल आवश्यक है';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'अमान्य ईमेल प्रारूप';
    }
    if (!password) {
      newErrors.password = 'पासवर्ड आवश्यक है';
    } else if (password.length < 6) {
        newErrors.password = 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए';
    }
    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'पासवर्ड मेल नहीं खाते';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted successfully');
      handleClose(); // Simulate successful auth
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4 relative animate-fade-in-down">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'लॉग इन करें' : 'साइन अप करें'}</h2>
          <p className="text-gray-500 mt-2">जारी रखने के लिए अपने खाते तक पहुंचें।</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">ईमेल</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`} placeholder="you@example.com" />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">पासवर्ड</label>
                {isLogin && <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">पासवर्ड भूल गए?</a>}
            </div>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`} placeholder="••••••••" />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">पासवर्ड की पुष्टि करें</label>
              <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`} placeholder="••••••••" />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
          )}
          <button type="submit" className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:bg-gray-400 transition-colors">
            {isLogin ? 'लॉग इन करें' : 'खाता बनाएं'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">या इसके साथ जारी रखें</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <IconGoogle className="w-5 h-5 mr-2" />
                Google
            </button>
             <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <IconGitHub className="w-5 h-5 mr-2" />
                GitHub
            </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {isLogin ? 'अभी तक कोई खाता नहीं है? ' : 'पहले से एक खाता मौजूद है? '}
            <button onClick={() => { setIsLogin(!isLogin); setErrors({}); }} className="font-medium text-indigo-600 hover:text-indigo-500">
              {isLogin ? 'साइन अप करें' : 'लॉग इन करें'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};