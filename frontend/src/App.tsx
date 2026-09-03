import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import { OpeningExperience } from './components/OpeningExperience';
import { Navigation } from './components/Navigation';
import { HeroSearch } from './components/HeroSearch';
import { TruePriceComparison } from './components/TruePriceComparison';
import { SmartChoiceSelector } from './components/SmartChoiceSelector';
import { PriceHistoryChart } from './components/PriceHistoryChart';
import { MoodLineSpectrum } from './components/MoodLineSpectrum';
import { DecisionWizard } from './components/DecisionWizard';
import { GroupOrderCalculator } from './components/GroupOrderCalculator';
import { AskDishcountAI } from './components/AskDishcountAI';
import { RestaurantDiscovery } from './components/RestaurantDiscovery';
import { SavingsJournal } from './components/SavingsJournal';
import { PlatformComparisonSection } from './components/PlatformComparisonSection';
import { PriceAlertModal } from './components/PriceAlertModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';

import { MOCK_DISHES, MOCK_RESTAURANTS } from './data/mockDatabase';
import { Dish, Restaurant, ChoiceMode } from './types';
import { TruePriceEngine } from './services/truePriceEngine';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [location, setLocation] = useState('Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Selected Dish & Restaurant
  const [activeDish, setActiveDish] = useState<Dish>(MOCK_DISHES[0]);
  const [, setActiveRestaurant] = useState<Restaurant>(MOCK_RESTAURANTS[0]);

  // Choice Mode & Speed Slider
  const [choiceMode] = useState<ChoiceMode>('CHEAPEST');
  const [speedSliderVal, setSpeedSliderVal] = useState(25);

  // Modals & Drawers
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle Search Execution
  const handleExecuteSearch = (query: string) => {
    setSearchQuery(query);
    const matchedDish = MOCK_DISHES.find(
      d => d.name.toLowerCase().includes(query.toLowerCase()) || 
           d.category.toLowerCase().includes(query.toLowerCase())
    ) || MOCK_DISHES[0];
    
    setActiveDish(matchedDish);

    const el = document.getElementById('compare-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Sort platforms dynamically
  const sortedPlatforms = TruePriceEngine.sortPlatforms(
    activeDish.comparison,
    speedSliderVal > 60 ? 'FASTEST' : choiceMode
  );

  return (
    <div className="min-h-screen bg-[#120E0C] text-[#F4EBDD] selection:bg-[#D4AF37]/30 selection:text-white transition-colors duration-500 relative">
      
      {/* Ambient Royal Gold & Crimson Backdrop Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-radial from-[#D4AF37]/15 via-[#B86B4B]/05 to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-radial from-[#E63946]/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[700px] h-[700px] rounded-full bg-radial from-[#4F8A70]/15 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Custom Luxury Cursor */}
      <CustomCursor />

      {/* Cinematic Opening Sequence */}
      <AnimatePresence>
        {showIntro && (
          <OpeningExperience onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Minimal Header Navigation */}
      <Navigation
        location={location}
        onChangeLocation={() => setLocation(location === 'Bengaluru' ? 'Mumbai' : 'Bengaluru')}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenProfile={() => setIsFavoritesOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Master Content Flow */}
      <main className="relative z-10">
        
        {/* Editorial Hero Search Section */}
        <HeroSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExecuteSearch={handleExecuteSearch}
          location={location}
          onChangeLocation={() => setLocation(location === 'Bengaluru' ? 'Mumbai' : 'Bengaluru')}
        />

        {/* TRUE PRICE Engine Comparison Section */}
        <TruePriceComparison
          dish={activeDish}
          sortedPlatforms={sortedPlatforms}
          onOpenPlatform={(p) => {
            alert(`Opening ${p.platformName} for ${activeDish.name} at ₹${p.finalPayablePrice}`);
          }}
        />

        {/* Price vs Speed Interactive Slider */}
        <SmartChoiceSelector
          choiceMode={choiceMode}
          setChoiceMode={() => {}}
          speedSliderVal={speedSliderVal}
          setSpeedSliderVal={setSpeedSliderVal}
        />

        {/* Price History Line Graph ("Prices Have A Memory") */}
        <PriceHistoryChart />

        {/* Interactive Mood Spectrum */}
        <MoodLineSpectrum />

        {/* Food Decision System ("Not Sure What To Order?") */}
        <DecisionWizard
          onCompareDish={(dishName) => handleExecuteSearch(dishName)}
        />

        {/* Group Order Calculator */}
        <GroupOrderCalculator />

        {/* Restaurant Discovery ("Where Should You Eat?") */}
        <RestaurantDiscovery
          restaurants={MOCK_RESTAURANTS}
          onSelectRestaurant={(rest) => {
            setActiveRestaurant(rest);
            if (rest.popularDishes && rest.popularDishes.length > 0) {
              setActiveDish(rest.popularDishes[0]);
            }
            handleNavigateSection('compare-section');
          }}
        />

        {/* Platform Comparison Explanation ("Why Food Prices Change") */}
        <PlatformComparisonSection />

        {/* Personal Savings & Editorial Campaign Stories */}
        <SavingsJournal />

      </main>

      {/* Ask DISHCOUNT AI Assistant Overlay */}
      <AskDishcountAI
        onCompareDish={(dishName) => handleExecuteSearch(dishName)}
      />

      {/* Price Alert Modal */}
      <PriceAlertModal
        isOpen={isPriceAlertOpen}
        dishName={activeDish.name}
        currentPrice={sortedPlatforms[0].finalPayablePrice}
        onClose={() => setIsPriceAlertOpen(false)}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectDish={(dishName) => handleExecuteSearch(dishName)}
      />

      {/* Royal Editorial Footer */}
      <Footer />

    </div>
  );
}

export default App;
