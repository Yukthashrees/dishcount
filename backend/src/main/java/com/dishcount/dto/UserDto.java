package com.dishcount.dto;

public class UserDto {
    private Long id;
    private String email;
    private String name;
    private String role;

    public UserDto() {}

    public UserDto(Long id, String email, String name, String role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public static class Builder {
        private Long id;
        private String email;
        private String name;
        private String role;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder role(String role) { this.role = role; return this; }

        public UserDto build() {
            return new UserDto(id, email, name, role);
        }
    }
}
