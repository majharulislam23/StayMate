-- V22__ensure_admin_user.sql
-- Ensure the specific admin user exists and has correct roles
-- User: mpuspo2310304@bscse.uiu.ac.bd
-- Password: Password123! (hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C)

-- 1. Insert User if not exists
INSERT INTO users (email, password_hash, first_name, last_name, phone_number, profile_picture_url, bio, address, city, email_verified, phone_verified, role_selected, auth_provider, created_at, updated_at, last_login_at, enabled, account_status)
SELECT * FROM (SELECT
    'mpuspo2310304@bscse.uiu.ac.bd' AS email,
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.S8hHDaHqJGVVVMne3C' AS password_hash,
    'System' AS first_name,
    'Admin' AS last_name,
    '+8801700000000' AS phone_number,
    'https://ui-avatars.com/api/?name=System+Admin' AS profile_picture_url,
    'System Administrator' AS bio,
    'Admin HQ' AS address,
    'Dhaka' AS city,
    1 AS email_verified,
    1 AS phone_verified,
    1 AS role_selected,
    'LOCAL' AS auth_provider,
    NOW() AS created_at,
    NOW() AS updated_at,
    NOW() AS last_login_at,
    1 AS enabled,
    'ACTIVE' AS account_status
) AS tmp
WHERE NOT EXISTS (
    SELECT email FROM users WHERE email = 'mpuspo2310304@bscse.uiu.ac.bd'
) LIMIT 1;

-- 2. Get User ID
SET @admin_id = (SELECT id FROM users WHERE email = 'mpuspo2310304@bscse.uiu.ac.bd');

-- 3. Ensure ROLE_ADMIN exists
INSERT INTO user_roles (user_id, role)
SELECT * FROM (SELECT @admin_id, 'ROLE_ADMIN') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = @admin_id AND role = 'ROLE_ADMIN'
) LIMIT 1;

-- 4. Ensure ROLE_USER exists
INSERT INTO user_roles (user_id, role)
SELECT * FROM (SELECT @admin_id, 'ROLE_USER') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = @admin_id AND role = 'ROLE_USER'
) LIMIT 1;
