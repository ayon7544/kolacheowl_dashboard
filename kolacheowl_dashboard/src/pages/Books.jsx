import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Tag,
  Calendar,
  Edit3,
  Trash2,
  ChevronRight,
  X,
  UploadCloud,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  Image as ImageIcon,
} from "lucide-react";

// --- INITIAL DATA ---
const INITIAL_BOOKS = [
  {
    id: 1,
    title: "The Fracture",
    description:
      "In a world where reality itself is coming undone, Nessa must confront the memories she tried to forget. A haunting exploration..........",
    image:
      "https://images.unsplash.com/photo-1543004471-240ce49a2a27?q=80&w=500&auto=format&fit=crop",
    writer: "Rina Kent",
    published: "October 2025",
    featured: "Yes",
    about: "This is a story about the fragments of reality.",
  },
  {
    id: 2,
    title: "Echoes of the Void",
    description:
      "The void calls to those who listen. A tale of sacrifice, redemption, and the price of power in a world that has forgotten compassion..........",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500&auto=format&fit=crop",
    writer: "Dark Fantasy",
    published: "October 2025",
    featured: "No",
    about: "",
  },
  {
    id: 3,
    title: "Between the Cracks",
    description:
      "Lost between worlds, a wanderer searches for meaning in the fragments of a shattered reality. What waits in the spaces we fear to tread?",
    image:
      "https://images.unsplash.com/photo-1474932430478-3a7fb9067bd0?q=80&w=500&auto=format&fit=crop",
    writer: "Dark Fantasy",
    published: "October 2025",
    featured: "No",
    about: "",
  },
];

export default function Books() {
  // --- STATE ---
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [selectedBook, setSelectedBook] = useState(null);

  // --- FILTERING ---
  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.writer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setSelectedBook({
      title: "",
      writer: "",
      description: "",
      featured: "No",
      about: "",
    });
    setModalType("add");
  };

  const handleOpenEdit = (book) => {
    setSelectedBook(book);
    setModalType("edit");
  };

  const handleOpenDelete = (book) => {
    setSelectedBook(book);
    setModalType("delete");
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedBook(null);
  };

  const handleConfirmDelete = () => {
    setBooks((prev) => prev.filter((b) => b.id !== selectedBook.id));
    handleCloseModal();
  };

  const handleSaveBook = (formData) => {
    if (modalType === "edit") {
      setBooks((prev) =>
        prev.map((b) => (b.id === selectedBook.id ? { ...b, ...formData } : b))
      );
    } else {
      const newBook = {
        ...formData,
        id: Date.now(),
        published: "October 2025", // Default for demo
        image:
          "https://images.unsplash.com/photo-1543004471-240ce49a2a27?q=80&w=500",
      };
      setBooks((prev) => [newBook, ...prev]);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-slate-800">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Books Management
          </h1>
          <p className="text-gray-500 mt-1">Manage your book collection</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center bg-[#1e293b] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Add New Book
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-[#eef1f5] border-none rounded-xl focus:ring-2 focus:ring-slate-300 transition-all outline-none text-slate-700 placeholder:text-gray-400"
        />
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={() => handleOpenEdit(book)}
            onDelete={() => handleOpenDelete(book)}
          />
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-center items-center mt-12 gap-2 text-sm text-gray-400 font-medium">
        <button className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center">
          1
        </button>
        <button className="hover:text-slate-800">2</button>
        <button className="hover:text-slate-800">3</button>
        <span className="px-2">............</span>
        <button className="hover:text-slate-800">100</button>
        <button className="flex items-center ml-2 text-slate-800 font-bold hover:translate-x-1 transition-transform">
          Next <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      {/* --- MODALS --- */}
      {modalType === "delete" && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onClose={handleCloseModal}
        />
      )}

      {(modalType === "add" || modalType === "edit") && (
        <BookFormModal
          mode={modalType}
          book={selectedBook}
          onSave={handleSaveBook}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full group">
      <div className="h-64 w-full p-2.5 overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover rounded-[1.5rem]"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-slate-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {book.description}
        </p>

        <div className="flex items-center gap-8 mb-6">
          <MetaItem icon={Tag} label="Writer" value={book.writer} />
          <MetaItem icon={Calendar} label="Published" value={book.published} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 bg-[#eef1f5] hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-sm font-bold transition-all"
          >
            <Edit3 size={16} /> Edit
          </button>
          <button
            onClick={onDelete}
            className="w-12 flex items-center justify-center bg-[#fff1f2] hover:bg-pink-100 text-pink-500 py-3 rounded-xl border border-pink-100 transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={18} className="text-slate-800" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold leading-tight">
          {label}
        </p>
        <p className="text-xs font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function DeleteModal({ onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[400px] rounded-[2.5rem] p-10 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-slate-800 mb-10 px-4 leading-tight">
          Are you sure you want to delete ?
        </h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-3.5 bg-[#dc264e] hover:bg-[#c22043] text-white rounded-2xl font-bold shadow-lg shadow-pink-200 transition-all active:scale-95"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-white border-2 border-gray-100 text-slate-700 hover:bg-gray-50 rounded-2xl font-bold transition-all"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

function BookFormModal({ mode, book, onSave, onClose }) {
  const [form, setForm] = useState(book);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto py-10 px-4">
      <div className="bg-white w-full max-w-[750px] rounded-3xl shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">
            {mode === "edit" ? "Edit New Book" : "Add New Book"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormGroup
              label="Title"
              value={form.title}
              onChange={(v) => setForm({ ...form, title: v })}
              placeholder="Write your title"
            />
            <FormGroup
              label="Writer name"
              value={form.writer}
              onChange={(v) => setForm({ ...form, writer: v })}
              placeholder="Write your name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">
              Description
            </label>
            <textarea
              className="w-full p-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-slate-300 outline-none text-sm min-h-[120px] resize-none"
              placeholder="Write your description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">
                Thumbnail
              </label>
              <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white">
                <button className="bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap">
                  <ImageIcon size={14} /> Browse Image
                </button>
                <div className="px-3 text-xs text-gray-400 truncate">
                  No file chosen
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-3 ml-1">
                Featured Release
              </label>
              <div className="flex gap-6">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div
                      onClick={() => setForm({ ...form, featured: opt })}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        form.featured === opt
                          ? "border-slate-800"
                          : "border-gray-200 group-hover:border-slate-400"
                      }`}
                    >
                      {form.featured === opt && (
                        <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">
              Book Pdf
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-gray-50/50">
              <div className="p-4 bg-slate-800 rounded-2xl text-white mb-4">
                <UploadCloud size={30} />
              </div>
              <p className="text-sm font-bold text-slate-700 mb-1">
                Drag your file(s) to start uploading
              </p>
              <p className="text-xs text-gray-400 font-bold mb-4">OR</p>
              <button className="px-8 py-2.5 border-2 border-gray-200 bg-white rounded-xl text-sm font-bold text-slate-600 hover:bg-gray-50 transition-all">
                Browse files
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">
              About This Book
            </label>
            <div className="border-2 border-gray-100 rounded-3xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 p-2.5 flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-gray-200 text-xs font-bold">
                  12 <ChevronRight size={12} className="rotate-90" />
                </div>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <Bold size={16} className="text-gray-400" />{" "}
                <Italic size={16} className="text-gray-400" />{" "}
                <Underline size={16} className="text-gray-400" />
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <AlignLeft size={16} className="text-gray-400" />{" "}
                <List size={16} className="text-gray-400" />
              </div>
              <textarea
                className="w-full p-4 text-sm outline-none min-h-[150px] resize-none placeholder:text-gray-300"
                placeholder="type your news"
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-50 flex justify-center">
          <button
            onClick={() => onSave(form)}
            className="px-16 py-3.5 bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-800 mb-2 ml-1">
        {label}
      </label>
      <input
        type="text"
        className="w-full p-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-slate-300 outline-none text-sm placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
