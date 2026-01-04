-- V23__add_status_to_roommate_posts.sql

ALTER TABLE roommate_posts
ADD COLUMN status VARCHAR(20) DEFAULT 'PENDING' NOT NULL;

-- Update existing posts to APPROVED (assuming existing ones are valid for demo)
UPDATE roommate_posts SET status = 'APPROVED' WHERE status = 'PENDING';
