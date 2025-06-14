import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Globe, 
  Search, 
  ChevronDown, 
  Package, 
  Wrench, 
  Tag, 
  Store, 
  Users,
  Activity,
  MapPin
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import PlacesSidebar from './components/PlacesSidebar';
import HomePage from './pages/HomePage';
import ChefchaouenPage from './pages/ChefchaouenPage';
import ChatbotPage from './pages/ChatbotPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlacesSidebarOpen, setIsPlacesSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'culture', label: 'Culture' },
    { value: 'business', label: 'Business' }
  ];

  const navItems = {
    products: {
      title: 'Products',
      icon: <Package size={20} />,
      items: ['Featured Products', 'New Arrivals', 'Best Sellers', 'Categories', 'Brands']
    },
    services: {
      title: 'Services',
      icon: <Wrench size={20} />,
      items: ['Consulting', 'Training', 'Support', 'Custom Solutions', 'Maintenance']
    },
    promotions: {
      title: 'Promotional Offers',
      icon: <Tag size={20} />,
      items: ['Current Deals', 'Seasonal Offers', 'Clearance', 'Bundle Deals', 'Special Discounts']
    },
    eshops: {
      title: 'E-Shops',
      icon: <Store size={20} />,
      items: ['Featured Shops', 'New Shops', 'Popular Shops', 'Shop Categories', 'Shop Directory']
    },
    cooperatives: {
      title: 'Cooperatives',
      icon: <Users size={20} />,
      items: ['Local Cooperatives', 'Artisan Groups', 'Fair Trade', 'Community Projects', 'Support Programs']
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b-2 border-[#E6896B] shadow-sm">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between gap-8">
              {/* Left section */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-[#E6896B]/10 transition-all duration-300 hover:scale-105"
                >
                  <Activity size={22} className="text-[#DB6551]" />
                </button>
              </div>

              {/* Center section */}
              <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300">
                <span className="text-3xl font-bold text-[#DB6551] drop-shadow-sm">Place</span>
                <span className="text-3xl font-bold text-[#E6896B] drop-shadow-sm">2</span>
              </Link>

              {/* Right section */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsPlacesSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-[#E6896B]/10 transition-all duration-300 hover:scale-105"
                >
                  <MapPin size={22} className="text-[#DB6551]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Only show on home page */}
        <Routes>
          <Route path="/" element={
            <>
              <div className="bg-white border-b border-[#E6896B]/30 shadow-sm">
                <div className="container mx-auto">
                  <nav className="flex justify-center">
                    {Object.entries(navItems).map(([key, { title, icon, items }]) => (
                      <div key={key} className="relative group">
                        <button className="px-6 py-4 text-[#E6896B] hover:text-[#DB6551] flex items-center gap-2 font-medium transition-all duration-300 hover:bg-[#E6896B]/5 rounded-lg">
                          <span className="text-[#DB6551]">{icon}</span>
                          {title}
                          <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                        <div className="absolute left-0 top-full bg-white border-2 border-[#E6896B]/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] z-50 transform translate-y-2 group-hover:translate-y-0">
                          <div className="py-3">
                            {items.map((item, index) => (
                              <a
                                key={index}
                                href="#"
                                className="block px-4 py-3 text-sm text-[#E6896B] hover:bg-[#E6896B]/10 hover:text-[#DB6551] transition-all duration-200 font-medium"
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Search Area - Only show on home page */}
              <div className="container mx-auto px-4 flex justify-center bg-gradient-to-r from-[#E6896B]/5 to-white py-6">
                <div className="max-w-4xl w-full flex items-center gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-40 px-3 py-2.5 bg-white border-2 border-[#E6896B]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DB6551] focus:border-[#DB6551] text-[#E6896B] text-sm font-medium shadow-sm transition-all duration-300"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E6896B]" size={20} />
                    <input
                      type="text"
                      placeholder={`Search in ${selectedCategory === 'all' ? 'all categories' : selectedCategory}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 border-2 border-[#E6896B]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DB6551] focus:border-[#DB6551] text-sm shadow-sm transition-all duration-300 placeholder-[#E6896B]/60"
                    />
                  </div>
                </div>
              </div>
            </>
          } />
        </Routes>

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        <PlacesSidebar
          isOpen={isPlacesSidebarOpen}
          onClose={() => setIsPlacesSidebarOpen(false)}
        />

        <main className="flex-1 bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/africa/morocco/chefchaouen" element={<ChefchaouenPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t-2 border-[#E6896B] py-6 px-6">
          <div className="container mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-[#DB6551]" />
              <span className="text-[#DB6551] font-bold">Place2 © 2025</span>
            </div>
            <div className="flex gap-8">
              <Link to="/chatbot" className="text-[#E6896B] hover:text-[#DB6551] transition-colors duration-300 font-medium">Chatbot</Link>
              <a href="#" className="text-[#E6896B] hover:text-[#DB6551] transition-colors duration-300 font-medium">About</a>
              <a href="#" className="text-[#E6896B] hover:text-[#DB6551] transition-colors duration-300 font-medium">Privacy</a>
              <a href="#" className="text-[#E6896B] hover:text-[#DB6551] transition-colors duration-300 font-medium">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;