import React from 'react';
import { 
  BookOpen, 
  Users, 
  FileText, 
  PlusSquare, 
  UserPlus, 
  PenTool, 
  ChevronDown,
  Upload
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// Mock Data for Charts
const bookData = [
  { name: 'Jan', total: 80 }, { name: 'Feb', total: 70 }, { name: 'Mar', total: 85 },
  { name: 'Apr', total: 40 }, { name: 'May', total: 75 }, { name: 'Jun', total: 70 },
  { name: 'July', total: 85 }, { name: 'Augst', total: 95 }, { name: 'Sep', total: 75 },
  { name: 'Oct', total: 85 }, { name: 'Nov', total: 75 }, { name: 'Dec', total: 90 },
];

const blogData = [
  { name: 'Jan', count: 55 }, { name: 'Feb', count: 48 }, { name: 'Mar', count: 48 },
  { name: 'Apr', count: 35 }, { name: 'May', count: 38 }, { name: 'Jun', count: 42 },
  { name: 'July', count: 48 }, { name: 'Augst', count: 52 }, { name: 'Sep', count: 58 },
  { name: 'Oct', count: 68 }, { name: 'Nov', count: 78 }, { name: 'Dec', count: 85 },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back to Nessa's Broken World. Here's your creative universe at a glance.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Books" value="250" Icon={BookOpen} />
        <StatCard title="Characters" value="50" Icon={Users} />
        <StatCard title="Total Blogs" value="160" Icon={FileText} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Total Books</h3>
            <button className="flex items-center text-sm text-gray-500 border rounded px-2 py-1">
              2025 <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#334155" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#334155" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#334155" fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Blogs Overview</h3>
            <button className="flex items-center text-sm text-gray-500 border rounded px-2 py-1">
              2025 <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={blogData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" verticalFill={['#fff', '#eee']} fillOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" fill="#0f172a" radius={[2, 2, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard icon={<BookOpen size={24}/>} title="Add New Book" desc="Create a new book entry" />
          <ActionCard icon={<Users size={24}/>} title="Add Character" desc="Create a new character" />
          <ActionCard icon={<FileText size={24}/>} title="Write Blog Post" desc="Publish a new article" />
        </div>
      </section>

      {/* Hero Section Form */}
      <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-1">Tittle</label>
            <input 
              type="text" 
              placeholder="Write your tittle" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input 
              type="text" 
              placeholder="Write your description" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <div className="flex gap-4">
              <div className="flex-1 flex border rounded-lg overflow-hidden">
                <button className="bg-slate-600 text-white px-4 py-2 text-sm flex items-center gap-2">
                  <Upload size={16} /> Browse Image
                </button>
                <div className="flex-1 bg-white"></div>
              </div>
              <button className="bg-slate-800 text-white px-8 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors">
                Publish
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sub-components
const StatCard = ({ title, value, Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
    <div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    <div className="p-2 bg-slate-100 rounded-lg">
      <Icon size={20} className="text-slate-700" />
    </div>
  </div>
);

const ActionCard = ({ icon, title, desc }) => (
  <button className="flex items-center gap-4 p-6 bg-white border-2 border-transparent hover:border-slate-200 rounded-2xl shadow-sm transition-all text-left group">
    <div className="bg-slate-800 text-white p-4 rounded-xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  </button>
);

export default DashboardPage;