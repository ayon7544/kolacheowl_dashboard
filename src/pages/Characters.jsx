import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";

// Import the same General UI Components used in Books
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { Input, InputGroup, Textarea } from "../components/Form";

const INITIAL_CHARACTERS = [
  {
    id: 1,
    name: "Nessa",
    title: "The Fractured Soul",
    background: "A woman caught between realities...",
    famousLine: "The pieces don't fit because the world is broken.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500",
  },
  {
    id: 2,
    name: "Kael",
    title: "The Shadow Walker",
    background: "A mysterious figure...",
    famousLine: "Shadows only exist where there is light.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500",
  },
];

export default function Characters() {
  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const filteredCharacters = useMemo(() => {
    return characters.filter(
      (char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [characters, searchTerm]);

  const handleSave = () => {
    if (modalType === "edit") {
      setCharacters((prev) =>
        prev.map((c) => (c.id === selectedCharacter.id ? selectedCharacter : c))
      );
    } else {
      setCharacters((prev) => [
        {
          ...selectedCharacter,
          id: Date.now(),
          image: INITIAL_CHARACTERS[0].image,
        },
        ...prev,
      ]);
    }
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-slate-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Characters Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage characters in Nessa's world
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedCharacter({
              name: "",
              title: "",
              background: "",
              famousLine: "",
              image: "",
            });
            setModalType("add");
          }}
          className="flex items-center bg-[#1e293b] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Add New Character
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-[#eef1f5] border-none rounded-xl focus:ring-2 focus:ring-slate-300 transition-all outline-none"
        />
      </div>

      {/* Grid using shared Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => (
          <Card
            key={char.id}
            title={char.name}
            image={char.image}
            actions={
              <>
                <button
                  onClick={() => {
                    setSelectedCharacter(char);
                    setModalType("edit");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#eef1f5] hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-bold transition-all"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedCharacter(char);
                    setModalType("delete");
                  }}
                  className="w-12 flex items-center justify-center bg-[#fff1f2] hover:bg-pink-100 text-pink-500 py-2.5 rounded-lg border border-pink-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </>
            }
          >
            {/* Unique Character Design inside the general Card */}
            <p className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-wider">
              {char.title}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-grow line-clamp-3 italic">
              "{char.famousLine}"
            </p>
            <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 bg-slate-50 p-2 rounded-lg">
              {char.background}
            </p>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <Modal
          isOpen={true}
          onClose={() => setModalType(null)}
          title={modalType === "edit" ? "Edit Character" : "Add Character"}
          maxWidth="650px"
          footer={
            <button
              onClick={handleSave}
              className="px-16 py-3.5 bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95"
            >
              Publish
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Name">
              <Input
                placeholder="Write name"
                value={selectedCharacter.name}
                onChange={(e) =>
                  setSelectedCharacter({
                    ...selectedCharacter,
                    name: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup label="Title">
              <Input
                placeholder="Write title"
                value={selectedCharacter.title}
                onChange={(e) =>
                  setSelectedCharacter({
                    ...selectedCharacter,
                    title: e.target.value,
                  })
                }
              />
            </InputGroup>
          </div>

          <InputGroup label="Background">
            <Textarea
              placeholder="Write character background"
              value={selectedCharacter.background}
              onChange={(e) =>
                setSelectedCharacter({
                  ...selectedCharacter,
                  background: e.target.value,
                })
              }
            />
          </InputGroup>

          <InputGroup label="Character Famous Line">
            <Input
              placeholder="Enter Famous Line"
              value={selectedCharacter.famousLine}
              onChange={(e) =>
                setSelectedCharacter({
                  ...selectedCharacter,
                  famousLine: e.target.value,
                })
              }
            />
          </InputGroup>

          <InputGroup label="Photo">
            <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white w-full md:w-2/3">
              <button className="bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap">
                <ImageIcon size={14} /> Browse Image
              </button>
              <div className="px-3 text-xs text-gray-400 truncate">
                No file chosen
              </div>
            </div>
          </InputGroup>
        </Modal>
      )}

      {/* Delete Modal */}
      {modalType === "delete" && (
        <Modal
          isOpen={true}
          onClose={() => setModalType(null)}
          title=""
          maxWidth="380px"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-10 px-4 leading-tight">
              Are you sure you want to delete {selectedCharacter?.name}?
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setCharacters(
                    characters.filter((c) => c.id !== selectedCharacter.id)
                  );
                  setModalType(null);
                }}
                className="w-full py-3.5 bg-[#dc264e] hover:bg-[#c22043] text-white rounded-xl font-bold transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => setModalType(null)}
                className="w-full py-3.5 bg-white border-2 border-gray-100 text-slate-700 rounded-xl font-bold transition-all"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Pagination (Keep your original design here) */}
      <div className="flex justify-center items-center mt-12 gap-2 text-sm text-gray-400 font-medium">
        <button className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center">
          1
        </button>
        <button className="hover:text-slate-800">2</button>
        <button className="flex items-center ml-2 text-slate-800 font-bold">
          Next <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
