-- V20__comprehensive_demo_seed_data.sql
-- Complete production-quality seed data for StayMate platform
-- Generated: 2026-01-01
-- This migration provides realistic data for all dashboards and features

-- ============================================================
-- STEP 1: Clear existing seed data (preserving schema)
-- ============================================================
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM audit_logs;
DELETE FROM maintenance_requests;
DELETE FROM matches;
DELETE FROM notifications;
DELETE FROM messages;
DELETE FROM conversations;
DELETE FROM applications;
DELETE FROM bookings;
DELETE FROM roommate_posts;
DELETE FROM reviews;
DELETE FROM reports;
DELETE FROM properties;
DELETE FROM user_roles;
DELETE FROM users;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- STEP 2: INSERT USERS (1 Admin, 5 House Owners, 15 Regular Users)
-- Password: Password123! (BCrypt hash)
-- ============================================================
-- BCrypt hash for 'Password123!' = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C

INSERT INTO users (id, email, password_hash, first_name, last_name, phone_number, profile_picture_url, bio, address, city, email_verified, phone_verified, role_selected, auth_provider, provider_id, created_at, updated_at, last_login_at, enabled, account_status) VALUES
-- ADMIN
(1, 'admin@staymate.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Ashikur', 'Rahman', '+8801711000001', 'https://randomuser.me/api/portraits/men/1.jpg', 'Platform Administrator at StayMate.', 'House 12, Road 5, Banani', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-01-15 09:00:00', '2026-01-01 10:00:00', '2026-01-01 10:00:00', true, 'ACTIVE'),

-- HOUSE OWNERS (5)
(2, 'karim.hossain@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Karim', 'Hossain', '+8801712000002', 'https://randomuser.me/api/portraits/men/2.jpg', 'Property investor with 10+ years in Dhaka real estate.', 'House 45, Road 11, Dhanmondi', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-02-10 10:30:00', '2025-12-28 14:00:00', '2025-12-30 09:00:00', true, 'ACTIVE'),
(3, 'fatima.begum@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Fatima', 'Begum', '+8801713000003', 'https://randomuser.me/api/portraits/women/3.jpg', 'Professional landlord in Gulshan and Banani.', 'House 78, Road 8, Gulshan-1', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-03-05 11:45:00', '2025-12-25 16:30:00', '2025-12-29 11:00:00', true, 'ACTIVE'),
(4, 'rashid.khan@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Rashid', 'Khan', '+8801714000004', 'https://randomuser.me/api/portraits/men/4.jpg', 'Retired banker managing rental properties.', 'House 23, Road 3, Mohammadpur', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-04-12 09:15:00', '2025-12-20 10:00:00', '2025-12-28 08:30:00', true, 'ACTIVE'),
(5, 'nargis.akter@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Nargis', 'Akter', '+8801715000005', 'https://randomuser.me/api/portraits/women/5.jpg', 'Property manager in Chittagong.', 'House 56, GEC Circle', 'Chittagong', true, true, true, 'LOCAL', NULL, '2025-05-20 14:00:00', '2025-12-18 12:00:00', '2025-12-27 14:00:00', true, 'ACTIVE'),
(6, 'tanvir.ahmed@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Tanvir', 'Ahmed', '+8801716000006', 'https://randomuser.me/api/portraits/men/6.jpg', 'Young entrepreneur with properties in Sylhet.', 'House 34, Zindabazar', 'Sylhet', true, true, true, 'LOCAL', NULL, '2025-06-08 16:30:00', '2025-12-15 09:45:00', '2025-12-26 16:00:00', true, 'ACTIVE'),

-- REGULAR USERS / TENANTS (15)
(7, 'rifat.hassan@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Rifat', 'Hassan', '+8801717000007', 'https://randomuser.me/api/portraits/men/7.jpg', 'CS student at BUET.', 'BUET Campus, Polashi', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-07-01 10:00:00', '2025-12-30 08:00:00', '2026-01-01 09:00:00', true, 'ACTIVE'),
(8, 'sabrina.islam@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Sabrina', 'Islam', '+8801718000008', 'https://randomuser.me/api/portraits/women/8.jpg', 'Medical student at DMC.', 'Dhaka Medical College', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-07-15 11:30:00', '2025-12-29 15:00:00', '2025-12-31 10:00:00', true, 'ACTIVE'),
(9, 'imran.haque@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Imran', 'Haque', '+8801719000009', 'https://randomuser.me/api/portraits/men/9.jpg', 'Software developer at Grameenphone.', 'GP House, Bashundhara', 'Dhaka', true, true, true, 'GOOGLE', 'google_123456789', '2025-08-01 14:00:00', '2025-12-28 18:00:00', '2025-12-30 20:00:00', true, 'ACTIVE'),
(10, 'mithila.rahman@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Mithila', 'Rahman', '+8801720000010', 'https://randomuser.me/api/portraits/women/10.jpg', 'Marketing executive at Unilever.', 'Unilever House, Gulshan', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-08-10 09:45:00', '2025-12-27 11:00:00', '2025-12-29 14:00:00', true, 'ACTIVE'),
(11, 'arif.mahmud@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Arif', 'Mahmud', '+8801721000011', 'https://randomuser.me/api/portraits/men/11.jpg', 'MBA student at IBA.', 'IBA Campus, DU', 'Dhaka', true, false, true, 'LOCAL', NULL, '2025-08-20 12:30:00', '2025-12-26 16:00:00', '2025-12-28 09:00:00', true, 'ACTIVE'),
(12, 'tasnim.ferdous@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Tasnim', 'Ferdous', '+8801722000012', 'https://randomuser.me/api/portraits/women/12.jpg', 'NGO worker at BRAC.', 'BRAC Centre, Mohakhali', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-09-01 15:00:00', '2025-12-25 10:00:00', '2025-12-27 11:00:00', true, 'ACTIVE'),
(13, 'shahin.alam@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Shahin', 'Alam', '+8801723000013', 'https://randomuser.me/api/portraits/men/13.jpg', 'Freelance graphic designer.', 'Freelancer', 'Dhaka', true, true, true, 'GOOGLE', 'google_987654321', '2025-09-10 10:15:00', '2025-12-24 14:00:00', '2025-12-26 16:00:00', true, 'ACTIVE'),
(14, 'nusrat.jahan@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Nusrat', 'Jahan', '+8801724000014', 'https://randomuser.me/api/portraits/women/14.jpg', 'Accountant at Robi.', 'Robi Office, Gulshan', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-09-20 11:45:00', '2025-12-23 09:00:00', '2025-12-25 10:00:00', true, 'ACTIVE'),
(15, 'mahbub.rana@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Mahbub', 'Rana', '+8801725000015', 'https://randomuser.me/api/portraits/men/15.jpg', 'Civil engineering student at CUET.', 'CUET Campus', 'Chittagong', true, false, true, 'LOCAL', NULL, '2025-10-01 13:00:00', '2025-12-22 17:00:00', '2025-12-24 08:00:00', true, 'ACTIVE'),
(16, 'sumaiya.akter@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Sumaiya', 'Akter', '+8801726000016', 'https://randomuser.me/api/portraits/women/16.jpg', 'Teacher at a private school.', 'Uttara School', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-10-10 14:30:00', '2025-12-21 12:00:00', '2025-12-23 15:00:00', true, 'ACTIVE'),
(17, 'rakib.hasan@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Rakib', 'Hasan', '+8801727000017', 'https://randomuser.me/api/portraits/men/17.jpg', 'Pharmacy graduate job seeking.', 'Pharmacy Graduate', 'Dhaka', false, false, true, 'LOCAL', NULL, '2025-10-20 09:00:00', '2025-12-20 10:00:00', '2025-12-22 09:00:00', true, 'ACTIVE'),
(18, 'farzana.yasmin@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Farzana', 'Yasmin', '+8801728000018', 'https://randomuser.me/api/portraits/women/18.jpg', 'Law student at DU.', 'DU Law Faculty', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-11-01 16:00:00', '2025-12-19 14:00:00', '2025-12-21 11:00:00', true, 'ACTIVE'),
(19, 'shohag.mia@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Shohag', 'Mia', '+8801729000019', 'https://randomuser.me/api/portraits/men/19.jpg', 'Startup founder in tech industry.', 'Tech Startup', 'Dhaka', true, true, true, 'GOOGLE', 'google_456789123', '2025-11-10 10:30:00', '2025-12-18 16:00:00', '2025-12-20 14:00:00', true, 'ACTIVE'),
(20, 'tamanna.sultana@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Tamanna', 'Sultana', '+8801730000020', 'https://randomuser.me/api/portraits/women/20.jpg', 'Fashion designer.', 'Fashion Designer', 'Dhaka', true, true, true, 'LOCAL', NULL, '2025-11-20 12:00:00', '2025-12-17 11:00:00', '2025-12-19 16:00:00', true, 'ACTIVE'),
(21, 'jubayer.rahman@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C', 'Jubayer', 'Rahman', '+8801731000021', 'https://randomuser.me/api/portraits/men/21.jpg', 'Fresh grad from NSU.', 'NSU Graduate', 'Dhaka', true, false, true, 'LOCAL', NULL, '2025-12-01 09:00:00', '2025-12-16 10:00:00', '2025-12-18 09:00:00', true, 'ACTIVE');

-- ============================================================
-- STEP 3: INSERT USER ROLES
-- ============================================================
INSERT INTO user_roles (user_id, role) VALUES
(1, 'ROLE_ADMIN'), (1, 'ROLE_USER'),
(2, 'ROLE_HOUSE_OWNER'), (2, 'ROLE_USER'),
(3, 'ROLE_HOUSE_OWNER'), (3, 'ROLE_USER'),
(4, 'ROLE_HOUSE_OWNER'), (4, 'ROLE_USER'),
(5, 'ROLE_HOUSE_OWNER'), (5, 'ROLE_USER'),
(6, 'ROLE_HOUSE_OWNER'), (6, 'ROLE_USER'),
(7, 'ROLE_USER'), (8, 'ROLE_USER'), (9, 'ROLE_USER'), (10, 'ROLE_USER'),
(11, 'ROLE_USER'), (12, 'ROLE_USER'), (13, 'ROLE_USER'), (14, 'ROLE_USER'),
(15, 'ROLE_USER'), (16, 'ROLE_USER'), (17, 'ROLE_USER'), (18, 'ROLE_USER'),
(19, 'ROLE_USER'), (20, 'ROLE_USER'), (21, 'ROLE_USER');

-- ============================================================
-- STEP 4: INSERT PROPERTIES (12 properties)
-- ============================================================
INSERT INTO properties (id, owner_id, title, description, location, price, price_amount, beds, baths, sqft, property_type, image_url, rating, verified, views, inquiries, status, created_at, updated_at) VALUES
(1, 2, 'Spacious Studio in Dhanmondi', 'Modern studio with attached bath near Dhanmondi Lake.', 'Road 11, Dhanmondi, Dhaka', '12000/mo', 12000.00, 1, 1, 450, 'STUDIO', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 4.5, true, 245, 18, 'Active', '2025-03-01 10:00:00', '2025-12-28 10:00:00'),
(2, 2, 'Premium 2-Bed Apartment Dhanmondi', 'Fully furnished 2BR with modern kitchen.', 'Road 27, Dhanmondi, Dhaka', '28000/mo', 28000.00, 2, 2, 1100, 'APARTMENT', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 4.8, true, 412, 32, 'Active', '2025-04-15 11:00:00', '2025-12-25 14:00:00'),
(3, 2, 'Budget Room near Dhanmondi 32', 'Affordable single room in shared house.', 'Road 32, Dhanmondi, Dhaka', '6500/mo', 6500.00, 1, 1, 180, 'ROOM', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', 4.0, true, 189, 25, 'Active', '2025-05-20 09:00:00', '2025-12-20 11:00:00'),
(4, 3, 'Luxury Apartment Gulshan-1', 'Executive 3BR with city view and gym access.', 'Gulshan Avenue, Gulshan-1, Dhaka', '65000/mo', 65000.00, 3, 2, 1800, 'APARTMENT', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 4.9, true, 567, 45, 'Active', '2025-02-10 14:00:00', '2025-12-27 09:00:00'),
(5, 3, 'Cozy Female Accommodation Banani', 'Safe female-only accommodation with common areas.', 'Road 11, Banani, Dhaka', '8500/mo', 8500.00, 1, 1, 200, 'OTHER', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', 4.6, true, 334, 28, 'Active', '2025-03-25 10:30:00', '2025-12-26 15:00:00'),
(6, 4, 'Student Room near BUET', 'Single room 5 min walk from BUET.', 'Polashi, Mohammadpur, Dhaka', '5000/mo', 5000.00, 1, 1, 150, 'ROOM', 'https://images.unsplash.com/photo-1598928506311-c55eed391a57?w=800', 4.2, true, 423, 52, 'Active', '2025-01-15 09:00:00', '2025-12-29 08:00:00'),
(7, 4, 'Shared Flat for DU Students', '3BR shared flat near DU TSC.', 'Nilkhet, Near DU, Dhaka', '4500/mo', 4500.00, 1, 1, 180, 'SHARED_HOUSE', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', 4.3, true, 512, 63, 'Active', '2025-02-28 11:00:00', '2025-12-28 12:00:00'),
(8, 4, 'Modern Flat Mohammadpur', '2BR with modern amenities.', 'Town Hall, Mohammadpur, Dhaka', '18000/mo', 18000.00, 2, 1, 850, 'APARTMENT', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 4.4, true, 287, 22, 'Active', '2025-06-10 10:00:00', '2025-12-22 16:00:00'),
(9, 5, 'Sea View Apartment Chittagong', '2BR with partial sea view near GEC.', 'GEC Circle, Chittagong', '22000/mo', 22000.00, 2, 2, 1000, 'APARTMENT', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 4.7, true, 198, 15, 'Active', '2025-04-05 13:00:00', '2025-12-24 10:00:00'),
(10, 5, 'Budget Room near CUET', 'Affordable student room near CUET.', 'Near CUET, Chittagong', '4000/mo', 4000.00, 1, 1, 140, 'ROOM', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', 4.1, true, 156, 19, 'Active', '2025-05-12 09:30:00', '2025-12-21 11:00:00'),
(11, 6, 'Premium Flat Zindabazar Sylhet', '2BR in prime Sylhet location.', 'Zindabazar, Sylhet', '16000/mo', 16000.00, 2, 1, 900, 'APARTMENT', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 4.5, true, 178, 14, 'Active', '2025-03-18 12:00:00', '2025-12-23 14:00:00'),
(12, 6, 'Student Accommodation Sylhet City', 'Male accommodation with study room.', 'Subid Bazar, Sylhet', '3500/mo', 3500.00, 1, 1, 120, 'OTHER', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', 4.0, false, 134, 21, 'Pending', '2025-07-22 10:00:00', '2025-12-19 09:00:00');

-- ============================================================
-- STEP 5: INSERT BOOKINGS
-- ============================================================
INSERT INTO bookings (id, tenant_id, landlord_id, property_id, start_date, end_date, check_in_time, check_out_time, status, notes, created_at, updated_at) VALUES
(1, 7, 4, 6, '2025-12-01', '2026-06-30', '2025-12-01 14:00:00', NULL, 'CONFIRMED', 'BUET student semester booking.', '2025-11-25 10:00:00', '2025-12-01 14:00:00'),
(2, 8, 3, 5, '2025-11-15', '2026-05-15', '2025-11-15 10:00:00', NULL, 'CONFIRMED', 'Medical student long stay.', '2025-11-10 09:00:00', '2025-11-15 10:00:00'),
(3, 9, 3, 4, '2025-12-15', '2026-12-14', '2025-12-15 12:00:00', NULL, 'CONFIRMED', 'Developer annual lease.', '2025-12-10 11:00:00', '2025-12-15 12:00:00'),
(4, 10, 2, 2, '2025-10-01', '2026-09-30', '2025-10-01 15:00:00', NULL, 'CONFIRMED', 'Professional annual booking.', '2025-09-25 10:00:00', '2025-10-01 15:00:00'),
(5, 11, 4, 7, '2026-01-15', '2026-07-15', NULL, NULL, 'PENDING', 'IBA student request.', '2025-12-28 14:00:00', '2025-12-28 14:00:00'),
(6, 12, 3, 5, '2026-02-01', '2026-08-01', NULL, NULL, 'PENDING', 'NGO worker request.', '2025-12-29 10:00:00', '2025-12-29 10:00:00'),
(7, 15, 5, 10, '2026-01-10', '2026-06-10', NULL, NULL, 'PENDING', 'CUET student request.', '2025-12-27 16:00:00', '2025-12-27 16:00:00'),
(8, 13, 2, 1, '2025-06-01', '2025-11-30', '2025-06-01 14:00:00', '2025-11-30 12:00:00', 'COMPLETED', 'Freelancer completed stay.', '2025-05-25 10:00:00', '2025-11-30 12:00:00'),
(9, 14, 4, 8, '2025-03-01', '2025-08-31', '2025-03-01 10:00:00', '2025-08-31 11:00:00', 'COMPLETED', 'Accountant completed.', '2025-02-20 09:00:00', '2025-08-31 11:00:00'),
(10, 16, 2, 3, '2025-01-15', '2025-07-14', '2025-01-15 12:00:00', '2025-07-14 10:00:00', 'COMPLETED', 'Teacher completed.', '2025-01-10 11:00:00', '2025-07-14 10:00:00'),
(11, 17, 6, 12, '2025-11-01', '2026-04-30', NULL, NULL, 'CANCELLED', 'Cancelled due to job move.', '2025-10-25 09:00:00', '2025-10-28 15:00:00');

-- ============================================================
-- STEP 6: INSERT ROOMMATE POSTS
-- ============================================================
INSERT INTO roommate_posts (id, user_id, location, budget, move_in_date, bio, gender_preference, smoking, pets, occupation, created_at, updated_at) VALUES
(1, 7, 'Dhanmondi, Dhaka', 7000.00, '2026-02-01', 'CS student at BUET seeking quiet roommate.', 'MALE', false, false, 'Student', '2025-12-20 10:00:00', '2025-12-28 09:00:00'),
(2, 11, 'Mohammadpur, Dhaka', 5500.00, '2026-01-15', 'MBA student seeking studious roommate.', 'MALE', false, false, 'Student', '2025-12-18 14:00:00', '2025-12-26 11:00:00'),
(3, 18, 'Nilkhet, Dhaka', 6000.00, '2026-02-01', 'Law student seeking quiet female roommate.', 'FEMALE', false, false, 'Student', '2025-12-15 09:00:00', '2025-12-24 16:00:00'),
(4, 19, 'Gulshan, Dhaka', 15000.00, '2026-01-20', 'Tech entrepreneur seeking co-living partner.', 'ANY', false, false, 'Entrepreneur', '2025-12-22 11:00:00', '2025-12-29 10:00:00'),
(5, 21, 'Uttara, Dhaka', 8000.00, '2026-01-25', 'Fresh grad seeking affordable room.', 'MALE', false, false, 'Job Seeker', '2025-12-25 15:00:00', '2025-12-30 12:00:00'),
(6, 15, 'Chittagong City', 4500.00, '2026-01-10', 'CUET student seeking study partner.', 'MALE', false, false, 'Student', '2025-12-10 10:00:00', '2025-12-22 14:00:00');

-- ============================================================
-- STEP 7: INSERT CONVERSATIONS & MESSAGES
-- ============================================================
INSERT INTO conversations (id, participant_one_id, participant_two_id, subject, property_id, property_title, last_message_at, last_message_preview, participant_one_unread_count, participant_two_unread_count, participant_one_deleted, participant_two_deleted, created_at, updated_at) VALUES
(1, 7, 4, 'Inquiry: Student Room near BUET', 6, 'Student Room near BUET', '2025-12-28 15:30:00', 'Yes, the room is available.', 1, 0, false, false, '2025-11-20 10:00:00', '2025-12-28 15:30:00'),
(2, 9, 3, 'Booking: Luxury Apartment Gulshan-1', 4, 'Luxury Apartment Gulshan-1', '2025-12-27 18:00:00', 'Your booking is confirmed!', 0, 0, false, false, '2025-12-08 09:00:00', '2025-12-27 18:00:00'),
(3, 11, 4, 'Visit Request: Shared Flat DU', 7, 'Shared Flat for DU Students', '2025-12-29 10:00:00', 'Can I visit Saturday?', 0, 1, false, false, '2025-12-25 14:00:00', '2025-12-29 10:00:00'),
(4, 15, 5, 'Inquiry: Budget Room CUET', 10, 'Budget Room near CUET', '2025-12-26 11:00:00', 'Is WiFi included?', 1, 0, false, false, '2025-12-20 09:00:00', '2025-12-26 11:00:00'),
(5, 19, 6, 'Inquiry: Premium Flat Sylhet', 11, 'Premium Flat Zindabazar Sylhet', '2025-12-24 16:30:00', 'High-speed fiber available.', 0, 0, false, false, '2025-12-22 10:00:00', '2025-12-24 16:30:00');

INSERT INTO messages (id, conversation_id, sender_id, recipient_id, content, message_type, is_read, is_deleted_by_sender, is_deleted_by_recipient, created_at, updated_at) VALUES
(1, 1, 7, 4, 'Hi, is this room still available?', 'TEXT', true, false, false, '2025-11-20 10:00:00', '2025-11-20 10:00:00'),
(2, 1, 4, 7, 'Yes, available from December.', 'TEXT', true, false, false, '2025-11-20 11:30:00', '2025-11-20 11:30:00'),
(3, 1, 7, 4, 'Can I visit Saturday 3PM?', 'TEXT', true, false, false, '2025-11-20 15:00:00', '2025-11-20 15:00:00'),
(4, 1, 4, 7, 'Saturday 3PM works!', 'TEXT', true, false, false, '2025-11-21 09:30:00', '2025-11-21 09:30:00'),
(5, 2, 9, 3, 'Interested in Gulshan apt.', 'TEXT', true, false, false, '2025-12-08 09:00:00', '2025-12-08 09:00:00'),
(6, 2, 3, 9, 'Your booking is confirmed!', 'TEXT', true, false, false, '2025-12-27 18:00:00', '2025-12-27 18:00:00'),
(7, 3, 11, 4, 'Can I visit Saturday?', 'TEXT', false, false, false, '2025-12-29 10:00:00', '2025-12-29 10:00:00'),
(8, 4, 15, 5, 'Is WiFi included?', 'TEXT', false, false, false, '2025-12-26 11:00:00', '2025-12-26 11:00:00');

-- ============================================================
-- STEP 8: INSERT REVIEWS (using correct schema: author_id, receiver_id)
-- ============================================================
INSERT INTO reviews (id, author_id, receiver_id, property_id, rating, comment, created_at, updated_at) VALUES
(1, 13, 2, 1, 5, 'Excellent studio! Karim bhai very helpful. Highly recommend!', '2025-12-02 10:00:00', '2025-12-02 10:00:00'),
(2, 14, 4, 8, 4, 'Good apartment for the price. Fair landlord.', '2025-09-05 11:00:00', '2025-09-05 11:00:00'),
(3, 16, 2, 3, 4, 'Affordable room. Good for students on budget.', '2025-07-18 14:00:00', '2025-07-18 14:00:00'),
(4, 2, 13, NULL, 5, 'Shahin was ideal tenant. Paid on time, kept room clean.', '2025-12-03 09:00:00', '2025-12-03 09:00:00'),
(5, 4, 14, NULL, 5, 'Nusrat was responsible tenant. Highly recommend.', '2025-09-06 10:00:00', '2025-09-06 10:00:00');

-- ============================================================
-- STEP 9: INSERT NOTIFICATIONS
-- ============================================================
INSERT INTO notifications (id, user_id, type, title, message, is_read, action_url, created_at, updated_at) VALUES
(1, 1, 'SYSTEM_ANNOUNCEMENT', 'Platform Update', 'StayMate v2.0 deployed with AI matching!', true, '/dashboard', '2025-12-28 09:00:00', '2025-12-28 09:00:00'),
(2, 2, 'BOOKING_REQUEST', 'New Booking Request', 'Rifat Hassan requested Student Room.', true, '/dashboard/bookings/1', '2025-11-25 10:00:00', '2025-11-25 10:00:00'),
(3, 2, 'REVIEW_RECEIVED', 'New Review', 'Shahin left a 5-star review!', true, '/dashboard/reviews', '2025-12-02 10:00:00', '2025-12-02 10:00:00'),
(4, 3, 'BOOKING_CONFIRMED', 'Booking Confirmed', 'Imran Haque booking confirmed.', true, '/dashboard/bookings/3', '2025-12-15 12:00:00', '2025-12-15 12:00:00'),
(5, 4, 'BOOKING_REQUEST', 'New Booking Request', 'Arif Mahmud booking request.', false, '/dashboard/bookings/5', '2025-12-28 14:00:00', '2025-12-28 14:00:00'),
(6, 5, 'PROPERTY_INQUIRY', 'New Inquiry', 'Mahbub inquired about CUET room.', false, '/messages/4', '2025-12-26 11:00:00', '2025-12-26 11:00:00'),
(7, 7, 'BOOKING_CONFIRMED', 'Booking Confirmed', 'Your BUET room booking confirmed!', true, '/bookings/1', '2025-12-01 08:00:00', '2025-12-01 08:00:00'),
(8, 9, 'BOOKING_CONFIRMED', 'Welcome Home', 'Your Gulshan apartment is ready!', true, '/bookings/3', '2025-12-15 12:30:00', '2025-12-15 12:30:00'),
(9, 11, 'BOOKING_REQUEST', 'Booking Pending', 'Your booking request is under review.', false, '/bookings/5', '2025-12-28 14:05:00', '2025-12-28 14:05:00'),
(10, 7, 'ROOMMATE_MATCH', 'New Match', '85% match with Arif Mahmud!', false, '/roommates/matches', '2025-12-29 09:00:00', '2025-12-29 09:00:00'),
(11, 21, 'WELCOME', 'Welcome to StayMate', 'Complete your profile to find homes!', true, '/profile', '2025-12-01 09:00:00', '2025-12-01 09:00:00');

-- ============================================================
-- STEP 10: INSERT MATCHES
-- ============================================================
INSERT INTO matches (id, user1_id, user2_id, match_percentage, created_at) VALUES
(1, 7, 11, 85.5, '2025-12-28 10:00:00'),
(2, 7, 21, 72.3, '2025-12-28 10:05:00'),
(3, 11, 21, 78.9, '2025-12-28 10:10:00'),
(4, 18, 12, 82.1, '2025-12-27 14:00:00'),
(5, 19, 13, 65.4, '2025-12-26 11:00:00'),
(6, 15, 11, 70.2, '2025-12-25 09:00:00');

-- ============================================================
-- STEP 11: INSERT AUDIT LOGS
-- ============================================================
INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, details, ip_address, created_at) VALUES
(1, 1, 'LOGIN', 'USER', 1, 'Admin login success', '103.97.165.45', '2026-01-01 10:00:00'),
(2, 1, 'VIEW', 'DASHBOARD', NULL, 'Admin dashboard viewed', '103.97.165.45', '2026-01-01 10:01:00'),
(3, 1, 'APPROVE', 'PROPERTY', 11, 'Property approved', '103.97.165.45', '2025-12-30 14:00:00'),
(4, 2, 'LOGIN', 'USER', 2, 'Owner login', '103.97.165.50', '2025-12-30 09:00:00'),
(5, 2, 'CREATE', 'PROPERTY', 1, 'Property created', '103.97.165.50', '2025-03-01 10:00:00'),
(6, 7, 'LOGIN', 'USER', 7, 'User login', '103.97.165.60', '2026-01-01 09:00:00'),
(7, 7, 'CREATE', 'BOOKING', 1, 'Booking created', '103.97.165.60', '2025-11-25 10:00:00');

-- ============================================================
-- STEP 12: INSERT MAINTENANCE REQUESTS
-- ============================================================
INSERT INTO maintenance_requests (id, property_id, requester_id, assigned_to, title, description, type, priority, status, resolution, resolved_at, created_at, updated_at) VALUES
(1, 6, 7, NULL, 'Leaking Faucet', 'Bathroom faucet dripping for 2 days.', 'MAINTENANCE', 'MEDIUM', 'OPEN', NULL, NULL, '2025-12-28 10:00:00', '2025-12-28 10:00:00'),
(2, 4, 9, 3, 'AC Not Cooling', 'Bedroom AC not cooling properly.', 'MAINTENANCE', 'HIGH', 'IN_PROGRESS', NULL, NULL, '2025-12-27 15:00:00', '2025-12-28 09:00:00'),
(3, 2, 10, 2, 'Slow Internet', 'WiFi very slow past week.', 'COMPLAINT', 'MEDIUM', 'RESOLVED', 'Router replaced.', '2025-12-25 16:00:00', '2025-12-22 11:00:00', '2025-12-25 16:00:00'),
(4, 1, 13, 2, 'Shelf Request', 'Request additional shelf.', 'IMPROVEMENT', 'LOW', 'OPEN', NULL, NULL, '2025-10-15 09:00:00', '2025-10-15 09:00:00');

-- ============================================================
-- SEED DATA COMPLETE
-- Login: admin@staymate.com / Password123!
-- ============================================================
