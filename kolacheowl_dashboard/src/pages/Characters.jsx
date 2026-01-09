import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit3, Trash2, ChevronRight, 
  X, Image as ImageIcon
} from 'lucide-react';

// --- INITIAL DATA ---
const INITIAL_CHARACTERS = [
  {
    id: 1,
    name: "Nessa",
    title: "The Fractured Soul",
    background: "A woman caught between realities, struggling to piece together her fractured memories.",
    famousLine: "The pieces don't fit because the world is broken.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Kael",
    title: "The Shadow Walker",
    background: "A mysterious figure who has learned to navigate the spaces between worlds...",
    famousLine: "Shadows only exist where there is light.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Lyra",
    title: "The Memory Keeper",
    background: "Guardian of forgotten memories, she holds the keys to understanding the fracture.",
    famousLine: "To remember is to survive.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop"
  }
];

export default function Characters() {
  // --- STATE ---
  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // --- FILTERING ---
  const filteredCharacters = useMemo(() => {
    return characters.filter(char => 
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [characters, searchTerm]);

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setSelectedCharacter({ name: '', title: '', background: '', famousLine: '', image: '' });
    setModalType('add');
  };

  const handleOpenEdit = (char) => {
    setSelectedCharacter(char);
    setModalType('edit');
  };

  const handleOpenDelete = (char) => {
    setSelectedCharacter(char);
    setModalType('delete');
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedCharacter(null);
  };

  const handleConfirmDelete = () => {
    setCharacters(prev => prev.filter(c => c.id !== selectedCharacter.id));
    handleCloseModal();
  };

  const handleSaveCharacter = (formData) => {
    if (modalType === 'edit') {
      setCharacters(prev => prev.map(c => c.id === selectedCharacter.id ? { ...c, ...formData } : c));
    } else {
      const newChar = {
        ...formData,
        id: Date.now(),
        image: formData.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500"
      };
      setCharacters(prev => [newChar, ...prev]);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-slate-800">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Characters Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage characters in Nessa's world</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center bg-[#1e293b] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Add New Character
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-[#eef1f5] border-none rounded-xl focus:ring-2 focus:ring-slate-300 transition-all outline-none text-slate-700 placeholder:text-gray-400"
        />
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => (
          <CharacterCard 
            key={char.id} 
            character={char} 
            onEdit={() => handleOpenEdit(char)} 
            onDelete={() => handleOpenDelete(char)} 
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
        <CharacterFormModal 
          mode={modalType} 
          character={selectedCharacter} 
          onSave={handleSaveCharacter} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function CharacterCard({ character, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full">
      <div className="h-64 w-full p-2.5">
        <img src={character.image} alt={character.name} className="w-full h-full object-cover rounded-2xl" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900">{character.name}</h3>
        <p className="text-gray-400 text-xs font-bold mb-3">{character.title}</p>
        <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow line-clamp-3">
          {character.background}
        </p>

        <div className="flex gap-2">
          <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-2 bg-[#eef1f5] hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-bold transition-all">
            <Edit3 size={16} /> Edit
          </button>
          <button onClick={onDelete} className="w-12 flex items-center justify-center bg-[#fff1f2] hover:bg-pink-100 text-pink-500 py-2.5 rounded-lg border border-pink-100 transition-all">
            <Trash2 size={18} />
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

function CharacterFormModal({ mode, character, onSave, onClose }) {
  const [form, setForm] = useState(character);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white w-full max-w-[650px] rounded-3xl shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">{mode === 'edit' ? "Edit Character" : "Add Character"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormGroup label="Name" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Write your name" />
            <FormGroup label="Tittle" value={form.title} onChange={v => setForm({...form, title: v})} placeholder="Write your title" />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">Background</label>
            <textarea 
              className="w-full p-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-slate-300 outline-none text-sm min-h-[120px] resize-none"
              placeholder="Write your description"
              value={form.background}
              onChange={e => setForm({...form, background: e.target.value})}
            />
          </div>

          <div className="mb-6">
            <FormGroup label="Character Famous Line" value={form.famousLine} onChange={v => setForm({...form, famousLine: v})} placeholder="Enter Character Famous Line" />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">Photo</label>
            <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white w-full md:w-1/2">
              <button className="bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap">
                <ImageIcon size={14} /> Browse Image
              </button>
              <div className="px-3 text-xs text-gray-400 truncate">No file chosen</div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              onClick={() => onSave(form)}
              className="px-16 py-3.5 bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95"
            >
              Publish
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