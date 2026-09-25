import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, Star, Compass } from 'lucide-react';
import { DetailedRestaurant } from '../data/mockDatabase';

interface RestaurantDiscoveryProps {
  restaurants: DetailedRestaurant[];
  userLocation: string;
  onOpenLocationModal: () => void;
  onSelectRestaurant: (rest: DetailedRestaurant) => void;
}

export const RestaurantDiscovery: React.FC<RestaurantDiscoveryProps> = ({
  restaurants,
  userLocation,
  onOpenLocationModal,
  onSelectRestaurant
}) => {
  const [selectedMood, setSelectedMood] = useState<string>('ALL');
  const [selectedVenueType, setSelectedVenueType] = useState<string>('ALL');
  const [distanceMode, setDistanceMode] = useState<'NEARBY' | 'FAMOUS' | 'ALL'>('ALL');

  const MOODS = ['ALL', 'Quiet', 'Romantic', 'Cozy', 'Social', 'Celebrate', 'Late Night'];
  const VENUE_TYPES = [
    { id: 'ALL', label: 'All Venues' },
    { id: 'RESTAURANT', label: 'Restaurants' },
    { id: 'BREWERY', label: 'Breweries & Pubs' },
    { id: 'CAFE', label: 'Cafes & Bakehouses' },
    { id: 'FINE_DINING', label: 'Fine Dining' }
  ];

  const filteredVenues = restaurants.filter(v => {
    const matchesMood = selectedMood === 'ALL' || (v.moods && v.moods.includes(selectedMood as any));
    const matchesVenueType = selectedVenueType === 'ALL' || v.venueType === selectedVenueType;
    const matchesDistance = distanceMode === 'ALL' || 
                            (distanceMode === 'NEARBY' && parseFloat(v.distance) <= 2.0) ||
                            (distanceMode === 'FAMOUS' && v.isFamous);
    return matchesMood && matchesVenueType && matchesDistance;
  });

  return (
    <section id="discover-section" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Editorial Header */}
      <div className="mb-10 border-b border-[#C8A96B]/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase font-semibold">
              DINING & VENUE DISCOVERY
            </span>
            <button
              onClick={onOpenLocationModal}
              className="px-3 py-1 rounded-full bg-[#15100E] border border-[#C8A96B]/40 hover:border-[#C8A96B] text-[10px] font-sans text-[#C8A96B] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#C8A96B]" />
              <span>{userLocation}</span>
            </button>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#F4EBDD] uppercase tracking-wide">
            WHERE SHOULD YOU EAT?
          </h2>
          <p className="text-xs font-sans text-[#8A7E76] font-light mt-1">
            Discover nearby quiet cafes, romantic candlelit dinners, famous craft microbreweries & restaurants.
          </p>
        </div>

        {/* Distance / Famous Filter Toggle */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#15100E] border border-white/10 shrink-0">
          <button
            onClick={() => setDistanceMode('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans uppercase tracking-wider transition-colors ${
              distanceMode === 'ALL' ? 'bg-[#C8A96B] text-[#080706] font-semibold' : 'text-[#8A7E76] hover:text-[#F4EBDD]'
            }`}
          >
            All Venues
          </button>
          <button
            onClick={() => setDistanceMode('NEARBY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans uppercase tracking-wider flex items-center gap-1 transition-colors ${
              distanceMode === 'NEARBY' ? 'bg-[#C8A96B] text-[#080706] font-semibold' : 'text-[#8A7E76] hover:text-[#F4EBDD]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Near Me (≤ 2 km)</span>
          </button>
          <button
            onClick={() => setDistanceMode('FAMOUS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans uppercase tracking-wider flex items-center gap-1 transition-colors ${
              distanceMode === 'FAMOUS' ? 'bg-[#C8A96B] text-[#080706] font-semibold' : 'text-[#8A7E76] hover:text-[#F4EBDD]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Famous & Iconic</span>
          </button>
        </div>
      </div>

      {/* Mood Selector Tabs */}
      <div className="mb-6 space-y-3">
        <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#8A7E76] font-semibold block">
          SELECT DINING MOOD
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-5 py-2 rounded-full text-xs font-sans uppercase tracking-wider transition-all shrink-0 border ${
                selectedMood === mood
                  ? 'bg-[#C8A96B] text-[#080706] border-[#C8A96B] font-semibold shadow-lg'
                  : 'bg-[#15100E] border-white/10 text-[#8A7E76] hover:text-[#F4EBDD] hover:border-[#C8A96B]/40'
              }`}
            >
              {mood === 'ALL' ? '✨ All Moods' : mood}
            </button>
          ))}
        </div>
      </div>

      {/* Venue Type Filter Pills */}
      <div className="mb-10 flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/05 pb-4">
        {VENUE_TYPES.map((vt) => (
          <button
            key={vt.id}
            onClick={() => setSelectedVenueType(vt.id)}
            className={`px-4 py-1.5 rounded-lg text-xs font-sans uppercase tracking-wider transition-colors shrink-0 ${
              selectedVenueType === vt.id
                ? 'bg-[#0D0B0A] border border-[#C8A96B] text-[#C8A96B] font-semibold'
                : 'bg-[#15100E] border border-white/05 text-[#8A7E76] hover:text-[#F4EBDD]'
            }`}
          >
            {vt.label}
          </button>
        ))}
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVenues.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-[#15100E] rounded-2xl border border-white/05 p-8 text-[#8A7E76]">
            <p className="font-serif text-xl text-[#F4EBDD] mb-2">No venues matching your current filters.</p>
            <p className="text-xs">Try switching moods or expanding distance from "{userLocation}".</p>
            <button
              onClick={() => {
                setSelectedMood('ALL');
                setSelectedVenueType('ALL');
                setDistanceMode('ALL');
              }}
              className="mt-4 px-6 py-2 rounded bg-[#C8A96B] text-[#080706] text-xs font-semibold uppercase tracking-wider"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          filteredVenues.map((rest) => (
            <motion.div
              key={rest.id}
              whileHover={{ y: -6 }}
              onClick={() => onSelectRestaurant(rest)}
              className="rounded-2xl bg-[#15100E] border border-white/10 hover:border-[#C8A96B]/50 transition-all overflow-hidden cursor-pointer group shadow-2xl flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15100E] via-transparent to-transparent" />

                {/* Venue Type & Distance Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-sans tracking-widest uppercase font-semibold">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#C8A96B]/40 text-[#C8A96B]">
                    {rest.venueType.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#F4EBDD] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C8A96B]" /> {rest.distance}
                  </span>
                </div>
              </div>

              {/* Venue Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-sans text-[#8A7E76] mb-1">
                    <span className="text-[#C8A96B] uppercase font-semibold">{rest.cuisine[0]}</span>
                    <span className="flex items-center gap-1 text-[#F4EBDD]"><Star className="w-3.5 h-3.5 fill-[#C8A96B] text-[#C8A96B]" /> {rest.rating} ({rest.ratingCount})</span>
                  </div>

                  <h3 className="font-serif text-2xl font-light uppercase tracking-wider text-[#F4EBDD] group-hover:text-[#C8A96B] transition-colors mb-2">
                    {rest.name}
                  </h3>

                  <p className="text-xs font-sans text-[#8A7E76] font-light mb-4">
                    {rest.location}
                  </p>

                  {/* Mood Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {rest.moods?.map(m => (
                      <span key={m} className="px-2.5 py-0.5 rounded bg-[#0D0B0A] border border-white/05 text-[10px] font-sans text-[#8A7E76] uppercase">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 border-t border-white/05 flex items-center justify-between font-sans">
                  <div>
                    <span className="text-[10px] tracking-widest text-[#8A7E76] uppercase block">BEST DEAL TONIGHT</span>
                    <span className="text-base font-semibold text-[#F4EBDD]">From ₹{rest.startingFinalPrice} <span className="text-xs text-[#8A7E76] font-normal">on {rest.bestPlatform}</span></span>
                  </div>

                  <div className="px-4 py-2 rounded bg-[#0D0B0A] border border-[#C8A96B]/40 group-hover:bg-[#C8A96B] group-hover:text-[#080706] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1">
                    <span>VIEW MENU</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))
        )}
      </div>

    </section>
  );
};
