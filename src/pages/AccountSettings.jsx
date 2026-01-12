import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

// Reusable Component Imports
import { RichTextEditor } from "../components/RichTextEditor";

export default function AboutUsManagement() {
  // --- STATE ---
  const [content, setContent] = useState(
    "<p>By using the app, you agree to create an account and keep your login information secure. Users can book appointments, and service providers manage availability and appointments. Payments are handled between users and providers.</p><p>Education also nurtures empathy and cultural awareness, featuring a more inclusive and understanding society. By learning about diverse perspectives and histories, we become more open-minded and respectful of differences.</p>"
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- HANDLERS ---
  const handleSave = () => {
    setIsSaving(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 md:p-12 font-sans text-slate-800">
      
      {/* Title Section */}
      <div className="w-full max-w-225 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">About Us Content</h1>
        <p className="text-gray-500 text-sm">Update the information displayed on your public 'About' page.</p>
      </div>

      {/* Editor Container */}
      <div className="w-full max-w-225">
        
        {/* Main Editor Component */}
        <div className="w-full mb-6">
          <RichTextEditor
            content={content}
            onChange={(html) => setContent(html)}
            placeholder="Tell your story here..."
            minHeight="500px" // Custom height for this specific view
          />
        </div>

        {/* Status Message Area */}
        <div className="h-8 flex justify-center items-center mb-4">
          {showSuccess && (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-6 py-2 rounded-full text-sm font-bold border border-emerald-100 animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 size={16} /> Changes saved successfully
            </div>
          )}
        </div>

        {/* Save Action */}
        <div className="w-full">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-[0.98] tracking-wide ${
              isSaving 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-[#1e293b] text-white hover:bg-slate-800 shadow-slate-200"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}