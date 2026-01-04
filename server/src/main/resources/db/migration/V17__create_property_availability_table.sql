-- V17__create_property_availability_table.sql
-- Room availability tracking

CREATE TABLE IF NOT EXISTS property_availability (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    notes VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_avail_property (property_id),
    INDEX idx_avail_dates (start_date, end_date),

    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
