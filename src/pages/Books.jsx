import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Tag,
  Calendar,
  Edit3,
  Trash2,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";
import { FileUploader } from "../components/FileUploader";
// Reusable Component Imports
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { Input, InputGroup, Textarea } from "../components/Form";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { Pagination } from "../components/Pagination";
import TextEditor from "../components/TextEditor";
const INITIAL_BOOKS = [
  {
    id: 1,
    title: "The Fracture",
    description: "In a world where reality itself is coming undone...",
    image:
      "https://images.unsplash.com/photo-1543004471-240ce49a2a27?q=80&w=500",
    writer: "Rina Kent",
    published: "Oct 2025",
    featured: "Yes",
    about: "<p>Detailed information about the fracture...</p>",
  },
  {
    id: 2,
    title: "Echoes of the Void",
    description: "The void calls to those who listen...",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500",
    writer: "Dark Fantasy",
    published: "Oct 2025",
    featured: "No",
    about: "<p>The story of the void echoes...</p>",
  },
];

export default function Books() {
  const handleImageSelect = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedBook({ ...selectedBook, image: url });
  };
  const handlePdfSelect = (file) => {
    // Save the filename or the file object to state
    setSelectedBook({ ...selectedBook, pdfName: file.name });
  };
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- Search Filtering ---
  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.writer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  // --- Handlers ---
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

  const handleConfirmDelete = () => {
    setBooks((prev) => prev.filter((b) => b.id !== selectedBook.id));
    setModalType(null);
  };

  const handleSave = () => {
    if (modalType === "edit") {
      setBooks((prev) =>
        prev.map((b) => (b.id === selectedBook.id ? selectedBook : b))
      );
    } else {
      setBooks((prev) => [
        {
          ...selectedBook,
          id: Date.now(),
          published: new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          image: INITIAL_BOOKS[0].image,
        },
        ...prev,
      ]);
    }
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-slate-800">
      {/* Header */}
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

      {/* Search */}
      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by title or writer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-[#eef1f5] border-none rounded-xl focus:ring-2 focus:ring-slate-300 transition-all outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book) => (
          <Card
            key={book.id}
            title={book.title}
            image={book.image}
            actions={
              <>
                <button
                  onClick={() => handleOpenEdit(book)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#eef1f5] hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-sm font-bold transition-all"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleOpenDelete(book)}
                  className="w-12 flex items-center justify-center bg-[#fff1f2] hover:bg-pink-100 text-pink-500 py-3 rounded-xl border border-pink-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </>
            }
          >
            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
              {book.description}
            </p>
            <div className="flex items-center gap-8 mb-6">
              <MetaItem icon={Tag} label="Writer" value={book.writer} />
              <MetaItem
                icon={Calendar}
                label="Published"
                value={book.published}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Add/Edit Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <Modal
          isOpen={true}
          onClose={() => setModalType(null)}
          title={modalType === "edit" ? "Edit Book" : "Add New Book"}
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
            <InputGroup label="Title">
              <Input
                placeholder="Write your title"
                value={selectedBook?.title || ""}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, title: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup label="Writer name">
              <Input
                placeholder="Write author name"
                value={selectedBook?.writer || ""}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, writer: e.target.value })
                }
              />
            </InputGroup>
          </div>

          <InputGroup label="Description">
            <Textarea
              placeholder="Short description for the card"
              value={selectedBook?.description || ""}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  description: e.target.value,
                })
              }
            />
          </InputGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <InputGroup label="Thumbnail">
              <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white">
                <FileUploader onFileSelect={handleImageSelect} accept="image/*">
                  <div className="bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap">
                    <ImageIcon size={14} /> Browse Image
                  </div>
                </FileUploader>
                <div className="px-3 text-xs text-gray-400 truncate">
                  {selectedBook?.image ? "Image Selected" : "No file chosen"}
                </div>
              </div>
            </InputGroup>
            <InputGroup label="Featured Release">
              <div className="flex gap-6 mt-2">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() =>
                      setSelectedBook({ ...selectedBook, featured: opt })
                    }
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedBook?.featured === opt
                          ? "border-slate-800"
                          : "border-gray-200"
                      }`}
                    >
                      {selectedBook?.featured === opt && (
                        <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </InputGroup>
          </div>

          <InputGroup label="Book PDF">
            <FileUploader
              onFileSelect={handlePdfSelect}
              accept=".pdf"
              className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <div className="p-4 bg-slate-800 rounded-2xl text-white mb-4 shadow-lg shadow-slate-200">
                <UploadCloud size={30} />
              </div>
              <p className="text-sm font-bold text-slate-700 mb-1">
                {selectedBook?.pdfName || "Drag your PDF here to upload"}
              </p>
              <div className="mt-4 px-8 py-2.5 border-2 border-gray-200 bg-white rounded-xl text-sm font-bold text-slate-600">
                Browse files
              </div>
            </FileUploader>
          </InputGroup>

          <InputGroup label="About This Book (Full Details)">
            <TextEditor
              content={selectedBook?.about || ""}
              onChange={(html) =>
                setSelectedBook({ ...selectedBook, about: html })
              }
              placeholder="Write the full book synopsis and details..."
            />
          </InputGroup>
        </Modal>
      )}

      {/* Standalone Delete Modal */}
      <DeleteConfirmModal
        isOpen={modalType === "delete"}
        onClose={() => setModalType(null)}
        onConfirm={handleConfirmDelete}
        itemName={selectedBook?.title}
      />
    </div>
  );
}

// Internal Helper
function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-800">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold leading-tight">
          {label}
        </p>
        <p className="text-xs font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
