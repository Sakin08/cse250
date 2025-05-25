/*
  # Initial Schema Setup

  1. New Tables
    - `users` (managed by Supabase Auth)
    - `profiles`
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `avatar_url` (text, nullable)
      - `phone` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `packages`
      - `id` (uuid)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `price` (numeric)
      - `duration` (integer)
      - `image_url` (text)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `package_inclusions`
      - `id` (uuid)
      - `package_id` (uuid, references packages)
      - `description` (text)
    - `package_dates`
      - `id` (uuid)
      - `package_id` (uuid, references packages)
      - `available_date` (date)
      - `spots_available` (integer)
    - `bookings`
      - `id` (uuid)
      - `user_id` (uuid, references auth.users)
      - `package_id` (uuid, references packages)
      - `booking_date` (date)
      - `guests` (integer)
      - `total_price` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
    - `ratings`
      - `id` (uuid)
      - `user_id` (uuid, references auth.users)
      - `package_id` (uuid, references packages)
      - `stars` (integer)
      - `comment` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for admin users
*/

-- Create custom types
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  duration integer NOT NULL CHECK (duration > 0),
  image_url text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create package_inclusions table
CREATE TABLE IF NOT EXISTS package_inclusions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid REFERENCES packages ON DELETE CASCADE,
  description text NOT NULL
);

-- Create package_dates table
CREATE TABLE IF NOT EXISTS package_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid REFERENCES packages ON DELETE CASCADE,
  available_date date NOT NULL,
  spots_available integer NOT NULL CHECK (spots_available >= 0),
  UNIQUE (package_id, available_date)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  package_id uuid REFERENCES packages ON DELETE CASCADE,
  booking_date date NOT NULL,
  guests integer NOT NULL CHECK (guests > 0),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  status booking_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  package_id uuid REFERENCES packages ON DELETE CASCADE,
  stars integer NOT NULL CHECK (stars BETWEEN 1 AND 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, package_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for packages
CREATE POLICY "Anyone can view packages"
  ON packages FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Only admins can modify packages"
  ON packages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create policies for package_inclusions
CREATE POLICY "Anyone can view package inclusions"
  ON package_inclusions FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Only admins can modify package inclusions"
  ON package_inclusions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create policies for package_dates
CREATE POLICY "Anyone can view package dates"
  ON package_dates FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Only admins can modify package dates"
  ON package_dates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending bookings"
  ON bookings FOR UPDATE
  USING (
    auth.uid() = user_id
    AND status = 'pending'
  );

-- Create policies for ratings
CREATE POLICY "Anyone can view ratings"
  ON ratings FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can create ratings for packages they booked"
  ON ratings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE user_id = auth.uid()
      AND package_id = ratings.package_id
      AND status = 'completed'
    )
  );

CREATE POLICY "Users can update their own ratings"
  ON ratings FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();