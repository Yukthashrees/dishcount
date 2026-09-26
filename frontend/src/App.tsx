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
import { RAGSearchEngine } from './services/ragSearchEngine';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Selected Dish & Active Mood Filter
  const [activeDish, setActiveDish] = useState<Dish>(MOCK_DISHES[0]);
  const [activeMoodFilter, setActiveMoodFilter] = useState<string>('ALL');

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

  // Handle Mood Selection from Spectrum
  const handleSelectMoodFromSpectrum = (mood: string) => {
    setActiveMoodFilter(mood);
    handleNavigateSection('discover-section');
  };

  // RAG Dynamic Knowledge Retrieval Search Handler
  const handleExecuteSearch = (query: string) => {
    setSearchQuery(query);
    const q = query.trim().toLowerCase();

    // 1. Query RAG Knowledge Base first for specialized items like "sushi", "ramen", "jamun", "tacos"
    const ragMatches = RAGSearchEngine.searchKnowledgeBase(q);
    
    if (ragMatches && ragMatches.length > 0) {
      setSearchResultsRestaurants(ragMatches);

      // Set active dish from RAG result
      const ragItem = ragMatches[0].fullMenu[0];
      const convertedDish: Dish = {
        id: ragItem.id,
        restaurantId: ragMatches[0].id,
        restaurantName: ragMatches[0].name,
        name: ragItem.name,
        description: ragItem.description,
        category: ragItem.category,
        basePrice: ragItem.price,
        image: ragItem.image,
        rating: ragItem.rating,
        deliveryTimeAvg: '22 mins',
        priceRange: `₹${ragItem.bestPrice} – ₹${ragItem.price + 45}`,
        comparison: [
          { platformId: 'magicpin', platformName: 'Magicpin', logo: '🟣', status: 'BEST PRICE', statusDetail: 'Best rate tonight', basePrice: ragItem.price, restaurantDiscount: 30, couponDiscount: 25, deliveryFee: 20, platformFee: 4, taxes: 12, packagingFee: 10, cashback: 15, finalPayablePrice: ragItem.bestPrice, couponCode: 'SUPERPIN60', deliveryTimeMinutes: 24, dealScore: 98, scoreReason: 'Cheapest rate' },
          { platformId: 'swish', platformName: 'SWISH', logo: '⚡', status: 'FASTEST', statusDetail: '10 min delivery', basePrice: ragItem.price, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 15, platformFee: 3, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: ragItem.bestPrice + 12, couponCode: 'SWISH10M', deliveryTimeMinutes: 10, dealScore: 94, scoreReason: 'Fastest delivery' },
          { platformId: 'zomato', platformName: 'Zomato', logo: '🔴', status: 'AVAILABLE', statusDetail: 'Gold deal', basePrice: ragItem.price, restaurantDiscount: 25, couponDiscount: 15, deliveryFee: 30, platformFee: 5, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: ragItem.bestPrice + 25, couponCode: 'ZOMGOLD', deliveryTimeMinutes: 22, dealScore: 90, scoreReason: 'Gold discount' },
          { platformId: 'swiggy', platformName: 'Swiggy', logo: '🟠', status: 'AVAILABLE', statusDetail: 'Swiggy One', basePrice: ragItem.price, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 35, platformFee: 6, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: ragItem.bestPrice + 38, couponCode: 'SWIGGYIT', deliveryTimeMinutes: 25, dealScore: 84, scoreReason: 'Standard deal' }
        ]
      };
      setActiveDish(convertedDish);

      const el = document.getElementById('search-results-section') || document.getElementById('compare-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 2. Filter restaurants matching query in name, cuisine, or menu item
    let matchingRestaurants = DETAILED_RESTAURANTS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.some(c => c.toLowerCase().includes(q)) ||
      r.fullMenu.some(m => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
    );

    // 3. Smart Category Fallbacks for generic searches like "dessert", "coffee", "sandwich"
    if (matchingRestaurants.length === 0) {
      if (q.includes('dessert') || q.includes('sweet') || q.includes('cake') || q.includes('ice cream')) {
        matchingRestaurants = DETAILED_RESTAURANTS.filter(r =>
          r.id.includes('cafe') || r.cuisine.some(c => c.includes('Bakery') || c.includes('Dessert') || c.includes('Coffee'))
        );
      } else if (q.includes('sandwich') || q.includes('toast') || q.includes('burger')) {
        matchingRestaurants = DETAILED_RESTAURANTS.filter(r =>
          r.name.includes('Subko') || r.name.includes('Third Wave') || r.name.includes('Glen') || r.name.includes('Subway') || r.name.includes('Truffles')
        );
      } else {
        matchingRestaurants = DETAILED_RESTAURANTS.slice(0, 4);
      }
    }

    setSearchResultsRestaurants(matchingRestaurants);

    // Set Active Dish Comparison
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
        name: formattedTitle.includes('Roll') || formattedTitle.includes('roll') ? formattedTitle : `Signature ${formattedTitle}`,
        restaurantName: matchingRestaurants.length > 0 ? matchingRestaurants[0].name : 'Specialty Kitchens',
        category: `${formattedTitle} Gourmet`,
        cuisine: 'Specialty Eats',
        basePrice: basePrice,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        description: `Freshly prepared authentic ${query} served with premium ingredients and house signature condiments.`,
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
        <MoodLineSpectrum
          onSelectMood={handleSelectMoodFromSpectrum}
        />

        {/* Food Decision System ("Not Sure What To Order?") */}
        <DecisionWizard
          onCompareDish={(dishName) => handleExecuteSearch(dishName)}
        />

        {/* Group Order Calculator */}
        <GroupOrderCalculator />

        {/* Top-Rated Restaurant & Venue Discovery (Ranked by Rating & Location) */}
        <RestaurantDiscovery
          restaurants={DETAILED_RESTAURANTS}
          userLocation={location}
          activeMoodFromParent={activeMoodFilter}
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
