import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown, X, User, Users, Home } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ActivityCategory {
  id: string;
  icon: React.ReactNode;
  activities: {
    name: string;
    subActivities: string[];
  }[];
}

interface ActivityCard {
  title: string;
  description: string;
  path: string;
  tags: string[];
  duration: string;
  frequency: string;
  image: string;
}

const activityCategories: ActivityCategory[] = [
  {
    id: 'individual',
    icon: <User size={20} className="text-[#DB6551]" />,
    activities: [
      {
        name: 'Eat',
        subActivities: ['Eat healthy', 'Street food', 'Fine dining', 'Local cuisine']
      },
      {
        name: 'Study',
        subActivities: ['Study in university', 'Study abroad', 'Online courses', 'Language learning']
      },
      {
        name: 'Exercise',
        subActivities: ['Gym workout', 'Jogging', 'Yoga', 'Swimming']
      }
    ]
  },
  {
    id: 'couple',
    icon: <Users size={20} className="text-[#DB6551]" />,
    activities: [
      {
        name: 'Date',
        subActivities: ['Romantic dinner', 'Movie night', 'City exploration', 'Cooking together']
      },
      {
        name: 'Travel',
        subActivities: ['Weekend getaway', 'City break', 'Beach vacation', 'Adventure trip']
      },
      {
        name: 'Hobbies',
        subActivities: ['Dance classes', 'Art workshops', 'Photography', 'Sports']
      }
    ]
  },
  {
    id: 'family',
    icon: <Home size={20} className="text-[#DB6551]" />,
    activities: [
      {
        name: 'Entertainment',
        subActivities: ['Theme parks', 'Zoo visits', 'Movie theaters', 'Game nights']
      },
      {
        name: 'Outdoor',
        subActivities: ['Picnics', 'Beach days', 'Hiking', 'Camping']
      },
      {
        name: 'Education',
        subActivities: ['Museum visits', 'Science centers', 'Library activities', 'Cultural events']
      }
    ]
  }
];

const categoryPreviews: Record<string, ActivityCard[]> = {
  individual: [
    {
      title: 'Morning Run',
      description: 'Start your day with an energizing run in nature or around your neighborhood.',
      path: 'Individual > Exercise > Running',
      tags: ['Outdoor', 'Morning', 'Fitness'],
      duration: '30-60 mins',
      frequency: 'Weekly',
      image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Deep Work Session',
      description: 'Focused work time with no distractions to maximize productivity.',
      path: 'Individual > Work > Focus',
      tags: ['Indoor', 'Daytime', 'Productivity'],
      duration: '2-4 hours',
      frequency: 'Daily',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Personal Reading',
      description: 'Dedicated time for reading books or articles for personal growth.',
      path: 'Individual > Study > Reading',
      tags: ['Indoor', 'Any time', 'Learning'],
      duration: '1-2 hours',
      frequency: 'Weekly',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ],
  couple: [
    {
      title: 'Romantic Dinner',
      description: 'Enjoy a special dinner with your partner at a romantic restaurant or setting.',
      path: 'Couple > Dating > Dining',
      tags: ['Indoor', 'Outdoor', 'Evening'],
      duration: '2-3 hours',
      frequency: 'Monthly',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Weekend Getaway',
      description: 'Escape for a short trip to reconnect and explore new places together.',
      path: 'Couple > Travel > Short trips',
      tags: ['Outdoor', 'Weekend', 'Adventure'],
      duration: '2-3 days',
      frequency: 'Quarterly',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Dance Night',
      description: 'Take dance lessons or go dancing together for fun and connection.',
      path: 'Couple > Hobbies > Dancing',
      tags: ['Indoor', 'Evening', 'Social'],
      duration: '2-4 hours',
      frequency: 'Monthly',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ],
  family: [
    {
      title: 'Family Game Night',
      description: 'Board games or card games that everyone can enjoy together.',
      path: 'Family > Entertainment > Games',
      tags: ['Indoor', 'Evening', 'Bonding'],
      duration: '1-3 hours',
      frequency: 'Weekly',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Nature Hike',
      description: 'Explore local trails and enjoy nature as a family.',
      path: 'Family > Outdoor > Hiking',
      tags: ['Outdoor', 'Daytime', 'Exercise'],
      duration: '2-5 hours',
      frequency: 'Monthly',
      image: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Museum Visit',
      description: 'Educational and fun outing to explore art, history or science.',
      path: 'Family > Education > Museums',
      tags: ['Indoor', 'Daytime', 'Learning'],
      duration: '3-5 hours',
      frequency: 'Quarterly',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ]
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`fixed inset-y-0 left-0 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
    style={{ width: '800px' }}>
      {/* First Column - Icons */}
      <div className="w-20 border-r-2 border-[#E6896B]/20 bg-gradient-to-b from-white to-[#E6896B]/5 flex flex-col">
        <div className="p-4 border-b-2 border-[#E6896B]/20 flex items-center justify-center">
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#E6896B]/10 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-[#DB6551]" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {activityCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(selectedCategory === category.id ? null : category.id);
                setSelectedActivity(null);
              }}
              className={`w-full py-6 flex items-center justify-center hover:bg-[#E6896B]/10 transition-all duration-300 ${
                selectedCategory === category.id ? 'bg-[#E6896B]/20 border-r-4 border-[#DB6551]' : ''
              }`}
              aria-label={category.id}
            >
              <div className="flex flex-col items-center">
                {category.icon}
                {selectedCategory === category.id && (
                  <ChevronRight size={16} className="mt-2 text-[#DB6551] animate-pulse" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Second Column - Activities */}
      {selectedCategory && (
        <div className="w-64 border-r-2 border-[#E6896B]/20 bg-white flex flex-col">
          <div className="p-4 border-b-2 border-[#E6896B]/20">
            <h3 className="font-bold text-[#DB6551] text-lg">Activities</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {activityCategories
              .find(c => c.id === selectedCategory)?.activities
              .map((activity) => (
                <button
                  key={activity.name}
                  onClick={() => setSelectedActivity(selectedActivity === activity.name ? null : activity.name)}
                  className={`w-full px-4 py-4 text-left hover:bg-[#E6896B]/10 transition-all duration-300 border-l-4 ${
                    selectedActivity === activity.name 
                      ? 'bg-[#E6896B]/20 border-[#DB6551]' 
                      : 'border-transparent hover:border-[#E6896B]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#E6896B] font-semibold">{activity.name}</span>
                    {selectedActivity === activity.name ? (
                      <ChevronRight size={16} className="text-[#DB6551]" />
                    ) : null}
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Third Column - Content Area */}
      <div className="flex-1 bg-gradient-to-b from-white to-[#E6896B]/5 flex flex-col">
        {selectedCategory && (
          <div className="p-4 border-b-2 border-[#E6896B]/20">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E6896B]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 border-2 border-[#E6896B]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DB6551] focus:border-[#DB6551] font-medium placeholder-[#E6896B]/60 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4">
          {selectedActivity ? (
            // Show sub-activities when an activity is selected
            <>
              <h4 className="font-bold text-[#DB6551] mb-4 text-lg">Sub Activities</h4>
              <div className="flex flex-col gap-3">
                {activityCategories
                  .find(c => c.id === selectedCategory)?.activities
                  .find(a => a.name === selectedActivity)?.subActivities
                  .filter(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((subActivity) => (
                    <button
                      key={subActivity}
                      className="w-full px-4 py-3 text-left text-sm bg-white rounded-xl border-2 border-[#E6896B]/20 hover:bg-[#E6896B]/10 hover:border-[#DB6551]/40 transition-all duration-300 font-medium text-[#E6896B] hover:text-[#DB6551] shadow-sm hover:shadow-md"
                    >
                      {subActivity}
                    </button>
                  ))}
              </div>
            </>
          ) : selectedCategory ? (
            // Show preview cards when only category is selected
            <>
              <h4 className="font-bold text-[#DB6551] mb-4 text-lg">Featured Activities</h4>
              <div className="grid gap-6">
                {categoryPreviews[selectedCategory]
                  .filter(card => 
                    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    card.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((card, index) => (
                    <div key={index} className="bg-white rounded-2xl border-2 border-[#E6896B]/20 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#DB6551]/40">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="font-bold text-white text-lg drop-shadow-lg">{card.title}</h3>
                          <p className="text-xs text-white/80 mt-1 font-medium drop-shadow">{card.path}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-[#E6896B] mb-3 leading-relaxed">{card.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {card.tags.map((tag, i) => (
                            <span key={i} className="bg-[#E6896B]/10 text-[#DB6551] text-xs px-3 py-1.5 rounded-full font-semibold border border-[#E6896B]/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-xs text-[#E6896B] font-semibold">
                          <div>Duration: {card.duration}</div>
                          <div>Frequency: {card.frequency}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            // Show empty state when nothing is selected
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-6">
                <Search size={48} className="mx-auto text-[#E6896B]/40 mb-4" />
                <h3 className="text-xl font-bold text-[#DB6551] mb-2">Select a category</h3>
                <p className="text-[#E6896B] font-medium">Click on an icon to view activities</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;