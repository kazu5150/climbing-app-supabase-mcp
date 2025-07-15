-- ClimbTracker Database Schema for Supabase
-- Create the climb_records table

-- Create the climb_records table
CREATE TABLE climb_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    route_name VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    route_type VARCHAR(20) NOT NULL CHECK (route_type IN ('boulder', 'lead', 'toprope')),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('completed', 'failed', 'practice')),
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    duration INTEGER CHECK (duration > 0), -- duration in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for better query performance
CREATE INDEX idx_climb_records_date ON climb_records(date DESC);
CREATE INDEX idx_climb_records_route_type ON climb_records(route_type);
CREATE INDEX idx_climb_records_status ON climb_records(status);
CREATE INDEX idx_climb_records_area ON climb_records(area);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_climb_records_updated_at
    BEFORE UPDATE ON climb_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add some sample data for testing (optional)
INSERT INTO climb_records (route_name, area, grade, route_type, date, status, notes, rating, duration) VALUES
('Moonboard Classic', 'ホームジム', 'V5', 'boulder', '2024-01-15', 'completed', '初めてのV5完登！', 4, 45),
('エアリア', '小川山', '5.10a', 'lead', '2024-01-20', 'completed', '天気も良くて最高の一日でした', 5, 120),
('スラブ練習', 'ホームジム', 'V3', 'boulder', '2024-01-22', 'practice', 'スラブのムーブを練習', 3, 30),
('オーバーハング', '御岳', 'V6', 'boulder', '2024-01-25', 'failed', 'もう少しで届きそう。次回リベンジ！', NULL, 60);