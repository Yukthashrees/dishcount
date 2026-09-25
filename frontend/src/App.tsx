import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import { OpeningExperience } from './components/OpeningExperience';
import { Navigation } from './components/Navigation';
import { HeroSearch } from './components/HeroSearch';
import { TruePriceComparison } from './components/TruePriceComparison';
import { MultiRestaurantSearchResults } from './components/MultiRestaurantSearchResults';
import { RestaurantMenuModal } from './components/RestaurantMenuModal';
import { LocationModal } from './components/LocationModal';
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
import { AuthModal } from './components/AuthModal';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';

import { MOCK_DISHES, DETAILED_RESTAURANTS, DetailedRestaurant } from './data/mockDatabase';
import { Dish, ChoiceMode } from './types';
import { TruePriceEngine } from './services/truePriceEngine';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Selected Dish
  const [activeDish, setActiveDish] = useState<Dish>(MOCK_DISHES[0]);

  // Full Restaurant Menu Modal State
  const [selectedMenuRestaurant, setSelectedMenuRestaurant] = useState<DetailedRestaurant | null>(null);

  // Multi-Restaurant Search Results State
  const [searchResultsRestaurants, setSearchResultsRestaurants] = useState<DetailedRestaurant[]>([]);

  // Choice Mode & Speed Slider
  const [choiceMode] = useState<ChoiceMode>('CHEAPEST');
  const [speedSliderVal, setSpeedSliderVal] = useState(25);

  // Modals & Drawers
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

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

  // Dynamic Search Handler for Dish & Multi-Restaurant Lookup
  const handleExecuteSearch = (query: string) => {
    setSearchQuery(query);
    const q = query.trim().toLowerCase();

    // Find all matching restaurants serving this dish/cuisine
    const matchingRestaurants = DETAILED_RESTAURANTS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.some(c => c.toLowerCase().includes(q)) ||
      r.fullMenu.some(m => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
    );

    setSearchResultsRestaurants(matchingRestaurants.length > 0 ? matchingRestaurants : DETAILED_RESTAURANTS);

    // Set active dish comparison
    const matchedDish = MOCK_DISHES.find(
      d => d.name.toLowerCase().includes(q) || 
           d.category.toLowerCase().includes(q) ||
           d.restaurantName.toLowerCase().includes(q)
    );

    if (matchedDish) {
      setActiveDish(matchedDish);
    } else {
      const formattedTitle = query.charAt(0).toUpperCase() + query.slice(1);
      const basePrice = 220;

      const dynamicDish: Dish = {
        id: `dynamic-${Date.now()}`,
        name: formattedTitle.includes('Roll') || formattedTitle.includes('roll') ? formattedTitle : `${formattedTitle} Special`,
        restaurantName: matchingRestaurants.length > 0 ? matchingRestaurants[0].name : 'Empire & Specialty Kitchens',
        category: 'Popular Specialty',
        cuisine: 'Street Food & Gourmet',
        basePrice: basePrice,
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        description: `Signature fresh ${query} prepared with premium ingredients and authentic culinary spices.`,
        comparison: [
          { platformId: 'magicpin', platformName: 'Magicpin', logo: '🟣', status: 'BEST PRICE', statusDetail: 'Highest active discount', basePrice: basePrice, restaurantDiscount: 30, couponDiscount: 25, deliveryFee: 20, platformFee: 4, taxes: 11, packagingFee: 10, cashback: 15, finalPayablePrice: basePrice - 5, deliveryTimeMinutes: 22, available: true, couponCode: 'MAGICPIN50', scoreReason: 'Cheapest overall rate' },
          { platformId: 'swish', platformName: 'SWISH', logo: '⚡', status: 'FASTEST', statusDetail: '10-minute dispatch', basePrice: basePrice, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 15, platformFee: 3, taxes: 11, packagingFee: 10, cashback: 0, finalPayablePrice: basePrice + 4, deliveryTimeMinutes: 10, available: true, couponCode: 'SWISHFAST', scoreReason: '10-minute lightning dispatch' },
          { platformId: 'eatsure', platformName: 'EatSure', logo: '🛡️', status: 'AVAILABLE', statusDetail: 'Zero platform fee', basePrice: basePrice, itemPrice: basePrice, deliveryFee: 0, platformFee: 0, packagingFee: 0, taxes: 11, discount: 15, finalPayablePrice: basePrice + 16, deliveryTimeMinutes: 28, available: true, couponCode: 'SUREPASS', scoreReason: 'Zero platform fee guarantee' },
          { platformId: 'zomato', platformName: 'Zomato', logo: '🔴', status: 'AVAILABLE', statusDetail: 'Gold discount', basePrice: basePrice, restaurantDiscount: 25, couponDiscount: 15, deliveryFee: 30, platformFee: 5, taxes: 11, packagingFee: 10, cashback: 0, finalPayablePrice: basePrice + 17, deliveryTimeMinutes: 22, available: true, couponCode: 'ZOMATOGOLD', scoreReason: 'Zomato Gold discount' },
          { platformId: 'swiggy', platformName: 'Swiggy', logo: '🟠', status: 'AVAILABLE', statusDetail: 'Swiggy One', basePrice: basePrice, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 35, platformFee: 6, taxes: 11, packagingFee: 10, cashback: 0, finalPayablePrice: basePrice + 27, deliveryTimeMinutes: 24, available: true, couponCode: 'SWIGGYIT', scoreReason: 'Standard deal' }
        ]
      };
      setActiveDish(dynamicDish);
    }

    const el = document.getElementById('search-results-section') || document.getElementById('compare-section');
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

  const handlePlatformRedirect = (platformId: string) => {
    const urls: Record<string, string> = {
      swiggy: 'https://www.swiggy.com',
      zomato: 'https://www.zomato.com',
      magicpin: 'https://magicpin.in',
      eatsure: 'https://www.eatsure.com',
      swish: 'https://swish.app',
      foodpanda: 'https://www.foodpanda.com',
      ubereats: 'https://www.ubereats.com'
    };
    const target = urls[platformId.toLowerCase()] || `https://${platformId.toLowerCase()}.com`;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

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
        onChangeLocation={() => setIsLocationOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenProfile={() => setIsAuthOpen(true)}
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
          onChangeLocation={() => setIsLocationOpen(true)}
        />

        {/* Multi-Restaurant Search Results View */}
        {searchQuery && (
          <div id="search-results-section">
            <MultiRestaurantSearchResults
              query={searchQuery}
              restaurants={searchResultsRestaurants}
              onSelectRestaurantForMenu={(rest) => setSelectedMenuRestaurant(rest)}
              onSelectDishForComparison={(dish) => {
                setActiveDish(dish);
                handleNavigateSection('compare-section');
              }}
            />
          </div>
        )}

        {/* TRUE PRICE Engine Comparison Section */}
        <TruePriceComparison
          dish={activeDish}
          sortedPlatforms={sortedPlatforms}
          onOpenPlatform={(p) => handlePlatformRedirect(p.platformId)}
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

        {/* Restaurant & Venue Discovery (Restaurants, Breweries, Cafes, Fine Dining) */}
        <RestaurantDiscovery
          restaurants={DETAILED_RESTAURANTS}
          userLocation={location}
          onOpenLocationModal={() => setIsLocationOpen(true)}
          onSelectRestaurant={(rest) => {
            setSelectedMenuRestaurant(rest);
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

      {/* Full Restaurant Menu Booklet Modal */}
      <RestaurantMenuModal
        restaurant={selectedMenuRestaurant}
        isOpen={!!selectedMenuRestaurant}
        onClose={() => setSelectedMenuRestaurant(null)}
        onSelectDishForComparison={(dish) => {
          setActiveDish(dish);
          handleNavigateSection('compare-section');
        }}
      />

      {/* Location Modal (Live GPS & Area Search) */}
      <LocationModal
        isOpen={isLocationOpen}
        currentLocation={location}
        onClose={() => setIsLocationOpen(false)}
        onSelectLocation={(newLoc) => setLocation(newLoc)}
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

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Royal Editorial Footer */}
      <Footer />

    </div>
  );
}

export default App;
