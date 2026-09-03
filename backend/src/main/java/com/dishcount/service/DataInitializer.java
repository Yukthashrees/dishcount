package com.dishcount.service;

import com.dishcount.entity.*;
import com.dishcount.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final DishRepository dishRepository;
    private final PlatformRepository platformRepository;
    private final RestaurantDishRepository restaurantDishRepository;
    private final PriceRepository priceRepository;
    private final OfferRepository offerRepository;
    private final PriceHistoryRepository priceHistoryRepository;
    private final MoodRepository moodRepository;
    private final RestaurantMoodRepository restaurantMoodRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, RestaurantRepository restaurantRepository, DishRepository dishRepository, PlatformRepository platformRepository, RestaurantDishRepository restaurantDishRepository, PriceRepository priceRepository, OfferRepository offerRepository, PriceHistoryRepository priceHistoryRepository, MoodRepository moodRepository, RestaurantMoodRepository restaurantMoodRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.dishRepository = dishRepository;
        this.platformRepository = platformRepository;
        this.restaurantDishRepository = restaurantDishRepository;
        this.priceRepository = priceRepository;
        this.offerRepository = offerRepository;
        this.priceHistoryRepository = priceHistoryRepository;
        this.moodRepository = moodRepository;
        this.restaurantMoodRepository = restaurantMoodRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (restaurantRepository.count() > 0) {
            return;
        }

        // 1. Seed Demo User
        userRepository.save(User.builder()
                .name("Yuktha Shree")
                .email("demo@dishcount.com")
                .password(passwordEncoder.encode("password123"))
                .role(Role.ROLE_USER)
                .build());

        // 2. Seed 7 Food Platforms
        List<Platform> platforms = Arrays.asList(
                Platform.builder().name("Swiggy").logoUrl("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80").deepLinkBaseUrl("https://swiggy.com").primaryColor("#F4A261").active(true).build(),
                Platform.builder().name("Zomato").logoUrl("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80").deepLinkBaseUrl("https://zomato.com").primaryColor("#E63946").active(true).build(),
                Platform.builder().name("EatSure").logoUrl("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=100&q=80").deepLinkBaseUrl("https://eatsure.com").primaryColor("#2A9D8F").active(true).build(),
                Platform.builder().name("SWISH").logoUrl("https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&q=80").deepLinkBaseUrl("https://swish.app").primaryColor("#9B51E0").active(true).build(),
                Platform.builder().name("Magicpin").logoUrl("https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=100&q=80").deepLinkBaseUrl("https://magicpin.in").primaryColor("#D800A6").active(true).build(),
                Platform.builder().name("Foodpanda").logoUrl("https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=100&q=80").deepLinkBaseUrl("https://foodpanda.com").primaryColor("#FF2B85").active(true).build(),
                Platform.builder().name("Uber Eats").logoUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=100&q=80").deepLinkBaseUrl("https://ubereats.com").primaryColor("#10B981").active(true).build()
        );
        platformRepository.saveAll(platforms);

        // 3. Seed Moods
        List<Mood> moods = Arrays.asList(
                Mood.builder().name("Quiet").description("slow coffee / artisanal bake").build(),
                Mood.builder().name("Cozy").description("warm ramen / comfort food").build(),
                Mood.builder().name("Social").description("artisanal pizza / shared feast").build(),
                Mood.builder().name("Romantic").description("candlelight dinner / fine wine").build(),
                Mood.builder().name("Celebrate").description("royal fine dining / champagne").build(),
                Mood.builder().name("Late Night").description("saffron biryani / post-midnight").build()
        );
        moodRepository.saveAll(moods);

        // 4. Seed 20+ Demo Restaurants
        String[] restaurantNames = {
                "Meghana Foods", "Empire Restaurant", "La Piazza Trattoria", "Nagarjuna Restaurant",
                "Truffles", "Toit Brewpub", "Bheemas", "Third Wave Coffee",
                "Glen's Bakehouse", "Corner House Ice Cream", "MTR 1924", "Vidyarthi Bhavan",
                "Koramangala Social", "Chianti", "Pasta Street", "Absolute Barbecues",
                "Fisherman's Wharf", "Toscano", "Windmills Craftworks", "CTR (Shri Sagar)"
        };

        String[] cuisines = {
                "Hyderabadi Biryani", "North Indian & Mughlai", "Italian Fine Dining", "Andhra Meals",
                "American Gourmet Burgers", "Craft Beer & Pizza", "Andhra Spicy", "Artisanal Coffee & Bakes",
                "European Bakery", "Desserts & Sundaes", "South Indian Heritage", "Crispy Dosa Legend",
                "Modern European Pub", "Italian Wine & Pasta", "Artisanal Pasta", "Live Grill Feast",
                "Goan Seafood", "Italian Fine Dining", "Brewery & Continental", "Heritage Breakfast"
        };

        List<Restaurant> seededRestaurants = new ArrayList<>();
        for (int i = 0; i < restaurantNames.length; i++) {
            Restaurant r = Restaurant.builder()
                    .name(restaurantNames[i])
                    .description("Authentic " + cuisines[i] + " prepared with royal culinary standards in Bengaluru.")
                    .cuisine(cuisines[i])
                    .rating(4.2 + (i % 8) * 0.1)
                    .latitude(12.9716 + (i * 0.005))
                    .longitude(77.5946 + (i * 0.005))
                    .imageUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80")
                    .address("Indiranagar / Koramangala, Bengaluru")
                    .active(true)
                    .build();
            seededRestaurants.add(restaurantRepository.save(r));

            Mood m = moods.get(i % moods.size());
            restaurantMoodRepository.save(RestaurantMood.builder().restaurant(r).mood(m).build());
        }

        // 5. Seed 50+ Demo Dishes
        String[] dishNames = {
                "Chicken Biryani", "Hyderabadi Mutton Biryani", "Cheesy Truffle Pizza", "Butter Chicken & Naan",
                "Single Origin Cold Brew", "Chocolate Avalanche Sundae", "Crispy Masala Dosa", "Paneer Tikka Masala",
                "Fettuccine Alfredo", "Pepperoni Gourmet Pizza", "Dragon Chicken", "Garlic Butter Prawns",
                "Classic Smash Burger", "Tiramisu Signature", "Filter Coffee", "Mutton Chukka",
                "Paneer Butter Masala", "Chicken Chettinad", "Blueberry Cheesecake", "Woodfired Margherita",
                "Grilled Salmon Steak", "Barbecue Ribs", "Avocado Toast", "Matcha Green Tea Latte"
        };

        List<Dish> seededDishes = new ArrayList<>();
        for (int i = 0; i < dishNames.length; i++) {
            BigDecimal basePrice = BigDecimal.valueOf(180 + (i * 15));
            Dish d = Dish.builder()
                    .name(dishNames[i])
                    .description("Signature " + dishNames[i] + " with rich aromatic spices and premium fresh ingredients.")
                    .category(i % 2 == 0 ? "Main Course" : "Specialty")
                    .basePrice(basePrice)
                    .imageUrl("https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80")
                    .rating(4.5)
                    .build();
            seededDishes.add(dishRepository.save(d));
        }

        // 6. Seed RestaurantDish mappings & Prices
        for (Restaurant r : seededRestaurants) {
            for (int j = 0; j < 3; j++) {
                Dish d = seededDishes.get((r.getId().intValue() + j) % seededDishes.size());
                RestaurantDish rd = restaurantDishRepository.save(RestaurantDish.builder().restaurant(r).dish(d).available(true).build());

                for (Platform p : platforms) {
                    BigDecimal itemPrice = d.getBasePrice().add(BigDecimal.valueOf((p.getId() % 3) * 10));
                    BigDecimal deliveryFee = BigDecimal.valueOf(20 + p.getId() * 3);
                    BigDecimal platformFee = BigDecimal.valueOf(5 + p.getId());
                    BigDecimal packagingFee = BigDecimal.valueOf(10);
                    BigDecimal tax = itemPrice.multiply(BigDecimal.valueOf(0.05));
                    BigDecimal discount = BigDecimal.valueOf(30 + (p.getId() % 4) * 15);

                    BigDecimal finalPrice = itemPrice.add(deliveryFee).add(platformFee).add(packagingFee).add(tax).subtract(discount);

                    priceRepository.save(Price.builder()
                            .restaurantDish(rd)
                            .platform(p)
                            .itemPrice(itemPrice)
                            .deliveryFee(deliveryFee)
                            .platformFee(platformFee)
                            .packagingFee(packagingFee)
                            .tax(tax)
                            .discount(discount)
                            .finalPrice(finalPrice)
                            .deliveryTime(20 + p.getId().intValue() * 3)
                            .couponCode(p.getName().toUpperCase() + "SPECIAL")
                            .scoreReason("Standard promotional deal rate")
                            .available(true)
                            .lastUpdated(LocalDateTime.now())
                            .build());

                    priceHistoryRepository.save(PriceHistory.builder()
                            .restaurantDish(rd)
                            .platform(p)
                            .price(finalPrice)
                            .recordedAt(LocalDateTime.now().minusDays(5))
                            .build());
                }
            }
        }
    }
}
