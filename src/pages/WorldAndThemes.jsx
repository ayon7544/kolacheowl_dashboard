import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  User,
  Image as ImageIcon,
  ChevronRight,
} from "lucide-react";

// Reusable Component Imports
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { Input, InputGroup, Textarea } from "../components/Form";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { Pagination } from "../components/Pagination";
import { RichTextEditor } from "../components/RichTextEditor";

const INITIAL_CHARACTERS = [
  {
    id: 1,
    name: "Nessa Thorne",
    role: "Protagonist",
    description: "A wanderer searching for the fragments of her past.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
    bio: "<p>Nessa was born in the fractured city of Oakhaven...</p>",
  },
  {
    id: 2,
    name: "Kaelen the Void-Walker",
    role: "Antagonist",
    description:
      "A mysterious figure who thrives in the spaces between worlds.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
    bio: "<p>Kaelen's origins are unknown to most, but the legends say...</p>",
  },
];

export default function Characters() {
  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- Search Filtering ---
  const filteredCharacters = useMemo(() => {
    return characters.filter(
      (char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [characters, searchTerm]);

  // --- Handlers ---
  const handleOpenAdd = () => {
    setSelectedCharacter({ name: "", role: "", description: "", bio: "" });
    setModalType("add");
  };

  const handleOpenEdit = (char) => {
    setSelectedCharacter(char);
    setModalType("edit");
  };

  const handleOpenDelete = (char) => {
    setSelectedCharacter(char);
    setModalType("delete");
  };

  const handleConfirmDelete = () => {
    setCharacters((prev) => prev.filter((c) => c.id !== selectedCharacter.id));
    setModalType(null);
  };

  const handleSave = () => {
    if (modalType === "edit") {
      setCharacters((prev) =>
        prev.map((c) => (c.id === selectedCharacter.id ? selectedCharacter : c))
      );
    } else {
      const newChar = {
        ...selectedCharacter,
        id: Date.now(),
        image: selectedCharacter.image || INITIAL_CHARACTERS[0].image,
      };
      setCharacters((prev) => [newChar, ...prev]);
    }
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-slate-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Characters</h1>
          <p className="text-gray-500 mt-1">Manage the cast of your stories</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all active:scale-95 shadow-md"
        >
          <Plus size={18} className="mr-2" /> Add Character
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-10">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by name or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-[#eef1f5] border-none rounded-xl focus:ring-2 focus:ring-slate-300 outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCharacters.map((char) => (
          <Card
            key={char.id}
            title={char.name}
            image={char.image}
            actions={
              <>
                <button
                  onClick={() => handleOpenEdit(char)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#eef1f5] hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-sm font-bold transition-all"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleOpenDelete(char)}
                  className="w-12 flex items-center justify-center bg-[#fff1f2] hover:bg-pink-100 text-pink-500 py-3 rounded-xl border border-pink-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </>
            }
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                {char.role}
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {char.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={4}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Add/Edit Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <Modal
          isOpen={true}
          onClose={() => setModalType(null)}
          title={modalType === "edit" ? "Edit Character" : "Add New Character"}
          footer={
            <button
              onClick={handleSave}
              className="px-16 py-3.5 bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95"
            >
              Save Details
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <InputGroup label="Character Name">
              <Input
                placeholder="e.g. Nessa Thorne"
                value={selectedCharacter?.name || ""}
                onChange={(e) =>
                  setSelectedCharacter({
                    ...selectedCharacter,
                    name: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup label="Role / Title">
              <Input
                placeholder="e.g. Protagonist"
                value={selectedCharacter?.role || ""}
                onChange={(e) =>
                  setSelectedCharacter({
                    ...selectedCharacter,
                    role: e.target.value,
                  })
                }
              />
            </InputGroup>
          </div>

          <InputGroup label="Short Summary">
            <Textarea
              placeholder="A one-sentence summary for the card..."
              value={selectedCharacter?.description || ""}
              onChange={(e) =>
                setSelectedCharacter({
                  ...selectedCharacter,
                  description: e.target.value,
                })
              }
            />
          </InputGroup>

          <InputGroup label="Profile Image">
            <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white">
              <button className="bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <ImageIcon size={14} /> Browse Image
              </button>
              <div className="px-3 text-xs text-gray-400 truncate">
                No file chosen
              </div>
            </div>
          </InputGroup>

          <InputGroup label="Full Biography & Backstory">
            <RichTextEditor
              content={selectedCharacter?.bio || ""}
              onChange={(html) =>
                setSelectedCharacter({ ...selectedCharacter, bio: html })
              }
              placeholder="Tell the story of this character..."
            />
          </InputGroup>
        </Modal>
      )}

      {/* Reusable Delete Modal */}
      <DeleteConfirmModal
        isOpen={modalType === "delete"}
        onClose={() => setModalType(null)}
        onConfirm={handleConfirmDelete}
        itemName={selectedCharacter?.name}
      />
    </div>
  );
}
