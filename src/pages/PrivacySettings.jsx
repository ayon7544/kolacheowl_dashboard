import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { TextEditor } from "../components/TextEditor";

export default function PrivacyPolicyManagement() {
  const [content, setContent] = useState(
    "<h2>Privacy Policy</h2><p>By using the app, you agree to create an account and keep your login information secure. Users can book appointments, and service providers manage availability and appointments.</p>"
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Mock API Save
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 md:p-12 font-sans text-slate-800">
      <div className="w-full max-w-225 mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm">
          Update how you handle user data and legal compliance.
        </p>
      </div>

      <div className="w-full max-w-225">
        <TextEditor
          content={content}
          onChange={(html) => setContent(html)}
          placeholder="Type your Privacy Policy content here..."
          minHeight="500px"
        />

        <div
          className={`mt-4 h-8 flex justify-center transition-opacity duration-300 ${
            showSuccess ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100">
            <CheckCircle2 size={16} /> Privacy Policy updated successfully
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full mt-6 py-4 bg-[#1e293b] text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all active:scale-[0.99] disabled:bg-slate-400"
        >
          {isSaving ? "Saving..." : "Save Privacy Policy"}
        </button>
      </div>
    </div>
  );
}
