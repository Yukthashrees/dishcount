package com.dishcount.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "platforms")
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String logoUrl;

    private String deepLinkBaseUrl;

    private Boolean active = true;

    private String primaryColor;

    public Platform() {}

    public Platform(Long id, String name, String logoUrl, String deepLinkBaseUrl, Boolean active, String primaryColor) {
        this.id = id;
        this.name = name;
        this.logoUrl = logoUrl;
        this.deepLinkBaseUrl = deepLinkBaseUrl;
        this.active = active != null ? active : true;
        this.primaryColor = primaryColor;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public String getDeepLinkBaseUrl() { return deepLinkBaseUrl; }
    public void setDeepLinkBaseUrl(String deepLinkBaseUrl) { this.deepLinkBaseUrl = deepLinkBaseUrl; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public String getPrimaryColor() { return primaryColor; }
    public void setPrimaryColor(String primaryColor) { this.primaryColor = primaryColor; }

    public static class Builder {
        private Long id;
        private String name;
        private String logoUrl;
        private String deepLinkBaseUrl;
        private Boolean active = true;
        private String primaryColor;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }
        public Builder deepLinkBaseUrl(String deepLinkBaseUrl) { this.deepLinkBaseUrl = deepLinkBaseUrl; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder primaryColor(String primaryColor) { this.primaryColor = primaryColor; return this; }

        public Platform build() {
            return new Platform(id, name, logoUrl, deepLinkBaseUrl, active, primaryColor);
        }
    }
}
