import React from 'react';
import { useNavigate } from 'react-router-dom';
import { samplePlaces, sampleActivities, sampleEvents } from '../data/samples';
import ChatbotWidget from '../components/ChatbotWidget';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handlePlaceClick = (place: any) => {
    if (place.location.city === 'Chefchaouen') {
      navigate('/africa/morocco/chefchaouen');
    }
  };

  const getPlaceImage = (place: any) => {
    if (place.location.city === 'Chefchaouen') {
      return 'https://bluedoorcuisine.com/wp-content/uploads/2023/03/milad-alizadeh-JibMa0FbyHw-unsplash-scaled.jpg';
    }
    return place.media?.images[0];
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-16 bg-white">
      {/* Trending Places */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#DB6551] drop-shadow-sm">Trending Places</h2>
          <a href="#" className="text-[#E6896B] hover:text-[#DB6551] text-sm font-semibold transition-colors duration-300 hover:underline">
            View all places →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePlaces.slice(0, 3).map(place => (
            <div 
              key={place.id} 
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-[#E6896B]/20 ${
                place.location.city === 'Chefchaouen' 
                  ? 'cursor-pointer hover:-translate-y-2 hover:border-[#DB6551]/40' 
                  : 'hover:-translate-y-1'
              }`}
              onClick={() => handlePlaceClick(place)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={getPlaceImage(place)}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">{place.name}</h3>
                  <p className="text-white/90 text-sm font-medium drop-shadow">
                    {place.location.city}, {place.location.country}
                  </p>
                </div>
                {place.location.city === 'Chefchaouen' && (
                  <div className="absolute top-4 right-4 bg-[#DB6551] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-[#E6896B] transition-colors duration-300">
                    Explore →
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-[#E6896B] text-sm mb-4 line-clamp-2 leading-relaxed">
                  {place.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {place.categories.slice(0, 3).map((category, index) => (
                    <span 
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#E6896B]/10 text-[#DB6551] font-semibold border border-[#E6896B]/20"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Activities */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#DB6551] drop-shadow-sm">Trending Activities</h2>
          <a href="#" className="text-[#E6896B] hover:text-[#DB6551] text-sm font-semibold transition-colors duration-300 hover:underline">
            View all activities →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleActivities.slice(0, 3).map(activity => (
            <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-2 border-[#E6896B]/20 hover:border-[#DB6551]/40">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={activity.media?.images[0]}
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">{activity.name}</h3>
                  <p className="text-white/90 text-sm font-medium drop-shadow">
                    {activity.classification.level1}
                    {activity.classification.level2 && ` > ${activity.classification.level2}`}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#E6896B] text-sm mb-4 line-clamp-2 leading-relaxed">
                  {activity.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {activity.context.slice(0, 3).map((ctx, index) => (
                    <span 
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#DB6551]/10 text-[#DB6551] font-semibold border border-[#DB6551]/20"
                    >
                      {ctx}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-[#E6896B] font-medium">
                  {activity.duration && (
                    <p>Duration: {activity.duration.min}-{activity.duration.max} {activity.duration.unit}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Events */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#DB6551] drop-shadow-sm">Trending Events</h2>
          <a href="#" className="text-[#E6896B] hover:text-[#DB6551] text-sm font-semibold transition-colors duration-300 hover:underline">
            View all events →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleEvents.slice(0, 3).map(event => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-2 border-[#E6896B]/20 hover:border-[#DB6551]/40">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.media?.images[0]}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">{event.name}</h3>
                  <p className="text-white/90 text-sm font-medium drop-shadow">
                    {event.location.venue}, {event.location.city}
                  </p>
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                  <span className={`text-sm font-bold ${
                    event.status === 'upcoming' ? 'text-[#E6896B]' : 'text-[#DB6551]'
                  }`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Available'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#E6896B] text-sm mb-4 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.category.slice(0, 3).map((cat, index) => (
                    <span 
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#DB6551]/10 text-[#DB6551] font-semibold border border-[#DB6551]/20"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-[#E6896B] font-medium space-y-1">
                  <p className="font-semibold">Date: {formatDate(event.date)} at {event.time}</p>
                  {event.price && (
                    <p className="font-semibold">Price: {formatCurrency(event.price.amount, event.price.currency)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default HomePage;