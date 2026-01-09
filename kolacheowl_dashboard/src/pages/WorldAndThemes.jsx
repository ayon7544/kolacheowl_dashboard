import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit3, Trash2, ChevronRight, 
  X, Bold, Italic, Underline, List, AlignLeft, Image as ImageIcon,
  Calendar
} from 'lucide-react';

// --- INITIAL DATA ---
const INITIAL_THEMES = [
  {
    id: 1,
    title: "The Fractured Realm",
    date: "December 13, 2025",
    content: "Explore a world where reality itself has shattered into glass, each fragment reflecting a different possibility, a different path...",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    isActive: true
  },
  {
    id: 2,
    title: "The Void Between",
    date: "December 15, 2025",
    content: "Between the fragments of reality lies the Void—not an abyss of nothingness, but a space of pure potential...",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    isActive: false
  }
];

export default function WorldThemes() {
  // --- STATE ---
  const [themes, setThemes] = useState(INITIAL_THEMES);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [selectedTheme, setSelectedTheme] = useState(null);

  // --- FILTERING ---
  const filteredThemes = useMemo(() => {
    return themes.filter(theme => 
      theme.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [themes, searchTerm]);

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setSelectedTheme({ title: '', content: '', image: '', isActive: true });
    setModalType('add');
  };

  const handleOpenEdit = (theme) => {
    setSelectedTheme(theme);
    setModalType('edit');
  };

  const handleOpenDelete = (theme) => {
    setSelectedTheme(theme);
    setModalType('delete');
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedTheme(null);
  };

  const handleToggleActive = (id) => {
    setThemes(prev => prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t));
  };

  const handleConfirmDelete = () => {
    setThemes(prev => prev.filter(t => t.id !== selectedTheme.id));
    handleCloseModal();
  };

  const handleSaveTheme = (formData) => {
    if (modalType === 'edit') {
      setThemes(prev => prev.map(t => t.id === selectedTheme.id ? { ...t, ...formData } : t));
    } else {
      const newTheme = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        image: formData.image || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600"
      };
      setThemes(prev => [newTheme, ...prev]);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-slate-800">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">World/Themes Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage world-building content and themes</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center bg-[#1e293b] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all active:scale-95"
        >
          <Plus size={18} className="mr-2" /> New Theme
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search themes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-[#eef1f5] border-none rounded-xl focus:ring-2 focus:ring-slate-300 transition-all outline-none text-slate-700 placeholder:text-gray-400"
        />
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => (
          <ThemeCard 
            key={theme.id} 
            theme={theme} 
            onEdit={() => handleOpenEdit(theme)} 
            onDelete={() => handleOpenDelete(theme)}
            onToggle={() => handleToggleActive(theme.id)}
          />
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-center items-center mt-12 gap-2 text-sm text-gray-400 font-medium">
        <button className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center">1</button>
        <button className="hover:text-slate-800">2</button>
        <button className="hover:text-slate-800">3</button>
        <span className="px-2">............</span>
        <button className="hover:text-slate-800">100</button>
        <button className="flex items-center ml-2 text-slate-800 font-bold hover:translate-x-1 transition-transform">
          Next <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      {/* --- MODALS --- */}
      {modalType === 'delete' && (
        <DeleteModal onConfirm={handleConfirmDelete} onClose={handleCloseModal} />
      )}

      {(modalType === 'add' || modalType === 'edit') && (
        <ThemeFormModal 
          mode={modalType} 
          theme={selectedTheme} 
          onSave={handleSaveTheme} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ThemeCard({ theme, onEdit, onDelete, onToggle }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full">
      <div className="h-48 w-full p-2.5">
        <img src={theme.image} alt={theme.title} className="w-full h-full object-cover rounded-xl" />
      </div>
      <div className="px-5 pb-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mt-1">
            <Calendar size={10} /> {theme.date}
          </p>
          {/* Toggle Switch */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400">{theme.isActive ? 'On' : 'Off'}</span>
            <button 
              onClick={onToggle}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${theme.isActive ? 'bg-[#0f766e]' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${theme.isActive ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
        <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">{theme.title}</h3>
        <p className="text-gray-500 text-[11px] leading-relaxed mb-4 flex-grow line-clamp-2">
          {theme.content}
        </p>

        <div className="flex gap-2">
          <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-2 bg-[#eef1f5] hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-xs font-bold transition-all">
            <Edit3 size={14} /> Edit
          </button>
          <button onClick={onDelete} className="w-10 flex items-center justify-center bg-[#fff1f2] hover:bg-pink-100 text-pink-500 py-2 rounded-lg border border-pink-100 transition-all">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[380px] rounded-[2rem] p-10 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-slate-800 mb-10 px-4 leading-tight">Are you sure you want to delete ?</h3>
        <div className="flex flex-col gap-3">
          <button onClick={onConfirm} className="w-full py-3.5 bg-[#dc264e] hover:bg-[#c22043] text-white rounded-xl font-bold transition-all active:scale-95">
            Yes
          </button>
          <button onClick={onClose} className="w-full py-3.5 bg-white border-2 border-gray-100 text-slate-700 hover:bg-gray-50 rounded-xl font-bold transition-all">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemeFormModal({ mode, theme, onSave, onClose }) {
  const [form, setForm] = useState(theme);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white w-full max-w-[650px] rounded-3xl shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">{mode === 'edit' ? "Edit World & Themes" : "Add World & Themes"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormGroup label="Title" value={form.title} onChange={v => setForm({...form, title: v})} placeholder="Write your title" />
            
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">Image</label>
              <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white">
                <button className="bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap">
                  <ImageIcon size={14} /> Browse Image
                </button>
                <div className="px-3 text-xs text-gray-400 truncate">No file chosen</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">Blog</label>
            <div className="border-2 border-gray-100 rounded-3xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 p-2.5 flex items-center gap-3 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-gray-200 text-xs font-bold">12 <ChevronRight size={12} className="rotate-90" /></div>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <Bold size={16} className="text-gray-400" /> <Italic size={16} className="text-gray-400" /> <Underline size={16} className="text-gray-400" />
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <AlignLeft size={16} className="text-gray-400" /> <List size={16} className="text-gray-400" />
              </div>
              <textarea 
                className="w-full p-4 text-sm outline-none min-h-[250px] resize-none placeholder:text-gray-300"
                placeholder="type your blog"
                value={form.content}
                onChange={e => setForm({...form, content: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button 
              onClick={() => onSave(form)}
              className="px-16 py-3.5 bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95"
            >
              {mode === 'edit' ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">{label}</label>
      <input 
        type="text"
        className="w-full p-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-slate-300 outline-none text-sm placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}