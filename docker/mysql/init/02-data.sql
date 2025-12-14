-- Seed Data for Roommates
-- Password for all users is "password123"
INSERT INTO users (email, password_hash, first_name, last_name, phone_number, auth_provider, email_verified, phone_verified, role_selected, enabled, bio, city, address, created_at, updated_at) VALUES 
('roommate1@example.com', '$2a$10$5M4aswqv6OkUCWmkHFxjCOe1w.LmHE2GjuInJFefiexFwzCz3xQu2', 'Alex', 'Johnson', '1112223333', 'LOCAL', 1, 0, 1, 1, 'Looking for a quiet place', 'New York', '123 Broadway', NOW(), NOW()),
('roommate2@example.com', '$2a$10$5M4aswqv6OkUCWmkHFxjCOe1w.LmHE2GjuInJFefiexFwzCz3xQu2', 'Sarah', 'Smith', '4445556666', 'LOCAL', 1, 0, 1, 1, 'Student at NYU', 'Brooklyn', '456 Park Ave', NOW(), NOW()),
('roommate3@example.com', '$2a$10$5M4aswqv6OkUCWmkHFxjCOe1w.LmHE2GjuInJFefiexFwzCz3xQu2', 'Mike', 'Brown', '7778889999', 'LOCAL', 1, 0, 1, 1, 'Software Engineer', 'Queens', '789 Elm St', NOW(), NOW()),
('roommate4@example.com', '$2a$10$5M4aswqv6OkUCWmkHFxjCOe1w.LmHE2GjuInJFefiexFwzCz3xQu2', 'Emily', 'Davis', '1011121314', 'LOCAL', 1, 0, 1, 1, 'Artist and musician', 'Manhattan', '321 5th Ave', NOW(), NOW()),
('roommate5@example.com', '$2a$10$5M4aswqv6OkUCWmkHFxjCOe1w.LmHE2GjuInJFefiexFwzCz3xQu2', 'David', 'Wilson', '1516171819', 'LOCAL', 1, 0, 1, 1, 'Chef looking for roommate', 'Harlem', '654 Lenox Ave', NOW(), NOW());

INSERT INTO user_roles (user_id, role) 
SELECT id, 'ROLE_USER' FROM users WHERE email LIKE 'roommate%@example.com';
