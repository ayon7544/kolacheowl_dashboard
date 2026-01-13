import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import TextEditor from "../components/TextEditor";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { Input, InputGroup } from "../components/Form";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { Pagination } from "../components/Pagination";
import { LegalSkeleton } from "../components/shimmer/LegalSkeleton";
import {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from "../services/allApi";

export default function Blogs() {
  // --- API HOOKS ---
  const { data: blogsData, isLoading } = useGetBlogsQuery();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  // --- LOCAL STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- FILTERING ---
  const filteredBlogs = useMemo(() => {
    const list = blogsData?.data || [];
    return list.filter((blog) =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogsData, searchTerm]);

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setSelectedBlog({ title: "", description: "", isActive: true });
    setImageFile(null);
    setModalType("add");
  };

  const handleOpenEdit = (blog) => {
    setSelectedBlog({
      ...blog,
      description: blog.description || blog.content, // Support both naming conventions
    });
    setImageFile(null);
    setModalType("edit");
  };

  const handleSave = async () => {
    const formData = new FormData();

    // The specific JSON structure you requested
    const jsonData = {
      title: selectedBlog.title,
      description: selectedBlog.description,
      isActive: selectedBlog.isActive ?? true,
    };

    formData.append("data", JSON.stringify(jsonData));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (modalType === "edit") {
        await updateBlog({ id: selectedBlog.id, data: formData }).unwrap();
      } else {
        await createBlog(formData).unwrap();
      }
      setModalType(null);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBlog(selectedBlog.id).unwrap();
      setModalType(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  if (isLoading) return <LegalSkeleton />;
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

      {/* Pagination */}

      {/* Form Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <Modal
          isOpen={true}
          onClose={() => setModalType(null)}
          title={modalType === "edit" ? "Edit Blog" : "Add Blog"}
          footer={
            <button
              onClick={handleSave}
              disabled={isCreating || isUpdating}
              className="px-16 py-3.5 bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50"
            >
              {isCreating || isUpdating ? "Processing..." : "Confirm"}
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
              <div className="relative flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white overflow-hidden">
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
          </div>
          <InputGroup label="Blog Content">
            <TextEditor
              content={selectedBlog?.description || ""}
              onChange={(html) =>
                setSelectedBlog({ ...selectedBlog, description: html })
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
