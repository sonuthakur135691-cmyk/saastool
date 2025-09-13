
import React, { useState } from 'react';
import type { CustomizationState } from '../types';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import { IconSparkles } from './icons';
import { GoogleGenAI, Type } from "@google/genai";

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  customization: CustomizationState;
  onCustomizationChange: (newValues: Partial<CustomizationState>) => void;
}

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: keyof CustomizationState }> = ({ label, value, onChange, name }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
    />
  </div>
);

// Function to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ isOpen, onClose, customization, onCustomizationChange }) => {
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [generatedPalette, setGeneratedPalette] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onCustomizationChange({ [name]: value });
  };

  const handleColorChange = (color: string) => {
    onCustomizationChange({ primaryColor: color });
    setGeneratedPalette([]); // Clear generated palette when a manual color is picked
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedLogo(file);
      setLogoPreview(URL.createObjectURL(file));
      setError(null);
      setGeneratedPalette([]);
    }
  };

  const handleGenerateBrandKit = async () => {
    if (!uploadedLogo) {
      setError("Please upload a logo first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPalette([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imagePart = await fileToGenerativePart(uploadedLogo);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: {
          parts: [
            imagePart,
            { text: "Analyze this logo. Extract a vibrant color palette of 5 primary and secondary brand colors. Also, suggest a creative brand name (without a suffix) and a catchy hero title based on the visual identity. Return a JSON object with keys: 'palette' (array of hex strings), 'brandName' (string), 'heroTitle' (string)." }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              palette: { type: Type.ARRAY, items: { type: Type.STRING, description: "Hex color code" } },
              brandName: { type: Type.STRING, description: "Suggested brand name" },
              heroTitle: { type: Type.STRING, description: "Suggested hero title" }
            },
          },
        },
      });
      
      const result = JSON.parse(response.text);

      if (result.palette && result.palette.length > 0) {
        setGeneratedPalette(result.palette);
        onCustomizationChange({ 
            primaryColor: result.palette[0],
            brandName: result.brandName || customization.brandName,
            heroTitle: result.heroTitle || customization.heroTitle,
        });
      } else {
        throw new Error("AI did not return a valid palette.");
      }
    } catch (e) {
      console.error(e);
      setError("Could not generate brand kit. Please try another image.");
    } finally {
      setIsLoading(false);
    }
  };


  const colorPalette = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#64748b',
  ];

  return (
    <div className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full max-w-sm`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">कस्टमाइज़ करें</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>
      <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-65px)]">
        
        {/* AI Brand Kit Section */}
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
           <h3 className="text-md font-semibold text-gray-700 flex items-center"><IconSparkles className="w-5 h-5 mr-2 text-violet-500" /> AI ब्रांड किट जेनरेटर</h3>
           <label htmlFor="logo-upload" className="cursor-pointer block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">{logoPreview ? 'Change Logo' : 'अपना लोगो अपलोड करें'}</span>
              <input id="logo-upload" name="logo-upload" type="file" className="sr-only" accept="image/*" onChange={handleLogoUpload}/>
           </label>
           {logoPreview && (
             <div className="flex justify-center">
                <img src={logoPreview} alt="Logo Preview" className="h-16 w-auto object-contain rounded-md bg-white p-1 border" />
             </div>
           )}
           <button 
             onClick={handleGenerateBrandKit}
             disabled={isLoading || !uploadedLogo}
             className="w-full flex items-center justify-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
           >
            {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> प्रोसेस हो रहा है...</> : 'AI से ब्रांड किट बनाएं'}
           </button>
           {error && <p className="text-sm text-red-600">{error}</p>}
           {generatedPalette.length > 0 && (
             <div>
                <label className="block text-sm font-medium text-gray-700">AI द्वारा उत्पन्न पैलेट</label>
                <div className="mt-2 flex flex-wrap gap-3">
                    {generatedPalette.map(color => (
                        <button key={color} onClick={() => onCustomizationChange({ primaryColor: color })}
                            className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${customization.primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
                            style={{ backgroundColor: color }} aria-label={`Set color to ${color}`} />
                    ))}
                </div>
             </div>
           )}
        </div>
        
        <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 border-b pb-2">मैनुअल ब्रांडिंग</h3>
            <InputField label="ब्रांड नाम" name="brandName" value={customization.brandName} onChange={handleInputChange} />
            <InputField label="ब्रांड नाम Suffix" name="brandNameSuffix" value={customization.brandNameSuffix} onChange={handleInputChange} />
            <div>
              <label className="block text-sm font-medium text-gray-700">प्राथमिक रंग</label>
              <div className="mt-2 flex flex-wrap gap-3">
                {colorPalette.map(color => (
                  <button key={color} onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${customization.primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
                    style={{ backgroundColor: color }} aria-label={`Set color to ${color}`} />
                ))}
              </div>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 border-b pb-2">हीरो सेक्शन</h3>
            <InputField label="हीरो शीर्षक" name="heroTitle" value={customization.heroTitle} onChange={handleInputChange} />
            <div>
                 <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700">हीरो उपशीर्षक</label>
                 <textarea id="heroSubtitle" name="heroSubtitle" value={customization.heroSubtitle}
                    onChange={(e) => onCustomizationChange({ heroSubtitle: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
            </div>
        </div>
      </div>
    </div>
  );
};
