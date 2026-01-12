import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";

import { RichTextEditor } from "../components/RichTextEditor";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { Input, InputGroup } from "../components/Form";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { Pagination } from "../components/Pagination";

const INITIAL_BLOGS = [
  {
    id: 1,
    title: "The Making of a Broken World",
    date: "December 13, 2025",
    content:
      "<p>A behind-the-scenes look at how the world of Nessa came to life...</p>",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600",
  },
  {
    id: 2,
    title: "Character Spotlight: Nessa",
    date: "December 14, 2025",
    content: "<p>Diving deep into the mind of our protagonist...</p>",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
  },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- FILTERING & PAGINATION LOGIC ---
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogs, searchTerm]);

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setSelectedBlog({ title: "", content: "", image: "" });
    setModalType("add");
  };

  const handleOpenEdit = (blog) => {
    setSelectedBlog(blog);
    setModalType("edit");
  };

  const handleOpenDelete = (blog) => {
    setSelectedBlog(blog);
    setModalType("delete");
  };

  const handleConfirmDelete = () => {
    setBlogs((prev) => prev.filter((b) => b.id !== selectedBlog.id));
    setModalType(null);
  };

  const handleSave = () => {
    if (modalType === "edit") {
      setBlogs((prev) =>
        prev.map((b) => (b.id === selectedBlog.id ? selectedBlog : b))
      );
    } else {
      const newBlog = {
        ...selectedBlog,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        image: selectedBlog.image || INITIAL_BLOGS[0].image,
      };
      setBlogs((prev) => [newBlog, ...prev]);
    }
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-slate-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage blog posts
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center bg-[#1e293b] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all active:scale-95 shadow-md"
        >
          <Plus size={18} className="mr-2" /> New Blog Post
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
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 bg-[#eef1f5] border-none rounded-xl focus:ring-2 focus:ring-slate-300 transition-all outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <Card
            key={blog.id}
            title={blog.title}
            image={blog.image}
            actions={
              <>
                <button
                  onClick={() => handleOpenEdit(blog)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#eef1f5] hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  <Edit3 size={14} /> Edit
                </button>
                <button
                  onClick={() => handleOpenDelete(blog)}
                  className="w-10 flex items-center justify-center bg-[#fff1f2] hover:bg-pink-100 text-pink-500 py-2 rounded-lg border border-pink-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </>
            }
          >
            <p className="text-[10px] text-gray-400 font-bold mb-1 flex items-center gap-1 uppercase tracking-wider">
              <Calendar size={10} /> {blog.date}
            </p>
            <div
              className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 mt-2 prose-preview"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Form Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <Modal
          isOpen={true}
          onClose={() => setModalType(null)}
          title={modalType === "edit" ? "Edit Blog" : "Add Blog"}
          footer={
            <button
              onClick={handleSave}
              className="px-16 py-3.5 bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95"
            >
              Confirm
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <InputGroup label="Title">
              <Input
                placeholder="Write your title"
                value={selectedBlog?.title || ""}
                onChange={(e) =>
                  setSelectedBlog({ ...selectedBlog, title: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup label="Cover Image">
              <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white">
                <button className="bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap">
                  <ImageIcon size={14} /> Browse Image
                </button>
                <div className="px-3 text-xs text-gray-400 truncate">
                  No file chosen
                </div>
              </div>
            </InputGroup>
          </div>
          <InputGroup label="Blog Content">
            <RichTextEditor
              content={selectedBlog?.content || ""}
              onChange={(html) =>
                setSelectedBlog({ ...selectedBlog, content: html })
              }
              placeholder="Start writing your masterpiece..."
            />
          </InputGroup>
        </Modal>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={modalType === "delete"}
        onClose={() => setModalType(null)}
        onConfirm={handleConfirmDelete}
        itemName={selectedBlog?.title}
      />
    </div>
  );
}
