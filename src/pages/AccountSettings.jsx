import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, List, AlignLeft, 
  AlignCenter, AlignRight, Image as ImageIcon, 
  Type, CheckCircle2 
} from 'lucide-react';

export default function AboutUsManagement() {
  // --- STATE ---
  const [content, setContent] = useState(
    "By using the app, you agree to create an account and keep your login information secure. Users can book appointments, and service providers manage availability and appointments. Payments are handled between users and providers.\n\nEducation also nurtures empathy and cultural awareness, featuring a more inclusive and understanding society. By learning about diverse perspectives and histories, we become more open-minded and respectful of differences."
  );
  const [showSuccess, setShowSuccess] = useState(false);

  // --- HANDLERS ---
  const handleSave = () => {
    // Mock save functionality
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 md:p-12 font-sans text-slate-800">
      
      {/* Title Section */}
      <div className="w-full max-w-[900px] mb-10">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">About Us</h1>
      </div>

      {/* Editor Container */}
      <div className="w-full max-w-[900px] flex flex-col items-end">
        
        {/* Simplified Toolbar to match image */}
        <div className="flex items-center gap-1 mb-2 bg-gray-50 border border-gray-200 rounded-lg p-1 px-2 shadow-sm">
          <ToolbarButton icon={<ImageIcon size={16} />} />
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <ToolbarButton icon={<Type size={16} />} dropdown />
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <ToolbarButton icon={<Bold size={16} />} />
          <ToolbarButton icon={<Italic size={16} />} />
          <ToolbarButton icon={<Underline size={16} />} />
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <ToolbarButton icon={<AlignLeft size={16} />} />
          <ToolbarButton icon={<AlignCenter size={16} />} />
          <ToolbarButton icon={<AlignRight size={16} />} />
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <ToolbarButton icon={<List size={16} />} />
        </div>

        {/* Main Text Area */}
        <div className="w-full relative group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your About Us content here..."
            className="w-full min-h-[500px] p-8 bg-white border-2 border-slate-900 rounded-2xl text-slate-700 leading-relaxed text-base outline-none focus:ring-4 focus:ring-slate-50 transition-all shadow-sm resize-none"
          />
        </div>

        {/* Success Toast */}
        <div className={`mt-4 w-full flex justify-center transition-opacity duration-300 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100">
            <CheckCircle2 size={16} /> Changes saved successfully
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full mt-8">
          <button
            onClick={handleSave}
            className="w-full py-4 bg-[#2D3139] text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all active:scale-[0.99] tracking-wide"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT ---

function ToolbarButton({ icon, dropdown }) {
  return (
    <button className="p-2 hover:bg-white hover:shadow-sm rounded-md text-slate-500 hover:text-slate-800 transition-all flex items-center gap-1">
      {icon}
      {dropdown && <span className="text-[10px] font-bold border-l border-gray-300 pl-1 ml-1">v</span>}
    </button>
  );
}