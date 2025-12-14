-- MySQL Initialization Script
-- This script runs automatically when the MySQL container is first created

-- Ensure we're using the correct database
USE authdb;

-- Grant additional privileges to the application user
GRANT ALL PRIVILEGES ON authdb.* TO 'authuser'@'%';
FLUSH PRIVILEGES;

-- Create indexes for better query performance (optional - JPA will create tables)
-- These will be applied after Hibernate creates the tables

-- Note: The actual table creation is handled by Spring Boot JPA/Hibernate
-- based on the ddl-auto setting. This script is for any additional
-- database setup that needs to happen before the application starts.

-- You can add seed data here if needed
-- Example:
-- INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN'), ('ROLE_MODERATOR');
