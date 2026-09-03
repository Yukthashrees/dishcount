package com.dishcount.entity;

public class Location {
    private String name;
    private Double latitude;
    private Double longitude;

    public Location() {}

    public Location(String name, Double latitude, Double longitude) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static Builder builder() { return new Builder(); }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public static class Builder {
        private String name;
        private Double latitude;
        private Double longitude;

        public Builder name(String name) { this.name = name; return this; }
        public Builder latitude(Double latitude) { this.latitude = latitude; return this; }
        public Builder longitude(Double longitude) { this.longitude = longitude; return this; }

        public Location build() {
            return new Location(name, latitude, longitude);
        }
    }
}
