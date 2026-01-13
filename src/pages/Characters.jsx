import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";

// Shared Components
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { Input, InputGroup, Textarea } from "../components/Form";
import { Pagination } from "../components/Pagination";

// API Hooks
import {
  useGetCharactersQuery, // Adjust hook names based on your allApi.js
  useCreateCharacterMutation,
  useUpdateCharacterMutation,
  useDeleteCharacterMutation,
} from "../services/allApi";

export default function Characters() {
  // --- API HOOKS ---
  const { data: charactersData, isLoading } = useGetCharactersQuery();
  const [createCharacter, { isLoading: isCreating }] =
    useCreateCharacterMutation();
  const [updateCharacter, { isLoading: isUpdating }] =
    useUpdateCharacterMutation();
  const [deleteCharacter] = useDeleteCharacterMutation();

  // --- LOCAL STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- FILTERING ---
  const filteredCharacters = useMemo(() => {
    const list = charactersData?.data || [];
    return list.filter(
      (char) =>
        char.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [charactersData, searchTerm]);

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setSelectedCharacter({
      name: "",
      title: "",
      description: "",
      famousLine: "",
      isActive: true,
    });
    setImageFile(null);
    setModalType("add");
  };

  const handleOpenEdit = (char) => {
    setSelectedCharacter({
      ...char,
      description: char.description || char.background,
    });
    setImageFile(null);
    setModalType("edit");
  };

  const handleSave = async () => {
    const formData = new FormData();

    // The JSON data format you requested
    const jsonData = {
      name: selectedCharacter.name,
      title: selectedCharacter.title,
      description: selectedCharacter.description,
      famousLine: selectedCharacter.famousLine,
      isActive: selectedCharacter.isActive ?? false,
    };

    formData.append("data", JSON.stringify(jsonData));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (modalType === "edit") {
        await updateCharacter({
          id: selectedCharacter.id,
          data: formData,
        }).unwrap();
      } else {
        await createCharacter(formData).unwrap();
      }
      setModalType(null);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCharacter(selectedCharacter.id).unwrap();
      setModalType(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
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
          onClick={handleOpenAdd}
          className="flex items-center bg-[#1e293b] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all active:scale-95 shadow-md"
        >
          <Plus size={18} className="mr-2" /> Add New Character
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-[#eef1f5] border-none rounded-xl focus:ring-2 focus:ring-slate-300 transition-all outline-none"
        />
      </div>

      {/* Grid with Skeleton Logic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-95 rounded-2xl bg-gray-50 animate-pulse overflow-hidden"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-4">
                    <div className="h-5 bg-gray-200 w-3/4 rounded" />
                    <div className="h-3 bg-gray-200 w-full rounded" />
                    <div className="h-3 bg-gray-200 w-5/6 rounded" />
                  </div>
                </div>
              ))
          : filteredCharacters.map((char) => (
              <Card
                key={char.id}
                title={char.name}
                image={char.image}
                actions={
                  <>
                    <button
                      onClick={() => handleOpenEdit(char)}
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
                <p className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-wider">
                  {char.title}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 grow line-clamp-3 italic">
                  "{char.famousLine}"
                </p>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 bg-slate-50 p-2 rounded-lg">
                  {char.description || char.background}
                </p>
              </Card>
            ))}
      </div>

      {/* Pagination */}
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
        />
      )}

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
              disabled={isCreating || isUpdating}
              className="px-16 py-3.5 bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50"
            >
              {isCreating || isUpdating ? "Publishing..." : "Publish"}
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Name">
              <Input
                placeholder="Write name"
                value={selectedCharacter?.name || ""}
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
                value={selectedCharacter?.title || ""}
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
              value={selectedCharacter?.description || ""}
              onChange={(e) =>
                setSelectedCharacter({
                  ...selectedCharacter,
                  description: e.target.value,
                })
              }
            />
          </InputGroup>

          <InputGroup label="Character Famous Line">
            <Input
              placeholder="Enter Famous Line"
              value={selectedCharacter?.famousLine || ""}
              onChange={(e) =>
                setSelectedCharacter({
                  ...selectedCharacter,
                  famousLine: e.target.value,
                })
              }
            />
          </InputGroup>

          <InputGroup label="Photo">
            <div className="relative flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white w-full md:w-2/3 overflow-hidden">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <div className="bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap">
                <ImageIcon size={14} /> Browse Image
              </div>
              <div className="px-3 text-xs text-gray-400 truncate">
                {imageFile ? imageFile.name : "No file chosen"}
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
                onClick={handleConfirmDelete}
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
    </div>
  );
}
