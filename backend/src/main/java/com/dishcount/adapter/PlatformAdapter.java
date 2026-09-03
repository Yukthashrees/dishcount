package com.dishcount.adapter;

import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;

public interface PlatformAdapter {
    String getPlatformId();
    String getPlatformName();
    boolean isEnabled();
    PlatformPriceResponse getPrice(Restaurant restaurant, Dish dish, Location location);
}
