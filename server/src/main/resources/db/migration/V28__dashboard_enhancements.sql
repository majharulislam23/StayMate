-- Add emergency_available to properties
ALTER TABLE properties ADD COLUMN emergency_available BOOLEAN DEFAULT FALSE;

-- Add seeking_mode to users (ROOM vs ROOMMATE)
ALTER TABLE users ADD COLUMN seeking_mode VARCHAR(20) DEFAULT 'ROOM';

-- Create expenses table for Smart Split Calculator
CREATE TABLE expenses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payer_id BIGINT NOT NULL,
    property_id BIGINT,
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_expense_payer FOREIGN KEY (payer_id) REFERENCES users(id),
    CONSTRAINT fk_expense_property FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Index for performance
CREATE INDEX idx_expenses_property ON expenses(property_id);
CREATE INDEX idx_expenses_payer ON expenses(payer_id);
