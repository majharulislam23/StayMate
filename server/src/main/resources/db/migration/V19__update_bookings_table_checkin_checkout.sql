-- V19__update_bookings_table_checkin_checkout.sql
-- Add check-in and check-out tracking columns

ALTER TABLE bookings
ADD COLUMN check_in_time TIMESTAMP NULL AFTER end_date,
ADD COLUMN check_out_time TIMESTAMP NULL AFTER check_in_time;
