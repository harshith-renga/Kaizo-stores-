-- KAIZO STORE Supabase Schema

-- Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    sizes TEXT[] DEFAULT '{"S", "M", "L", "XL"}',
    category TEXT NOT NULL DEFAULT 'club',
    stock INTEGER DEFAULT 10,
    sold_out BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    new_drop BOOLEAN DEFAULT false,
    image_url TEXT,
    details TEXT[] DEFAULT '{"Authentic Player Version", "Athletic fit", "Premium fabric"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create Policy for Public Read Access
CREATE POLICY "Allow public read access" ON public.products
    FOR SELECT USING (true);

-- Create Policy for Admin Write Access (For simplicity, allowing anon key for now, 
-- but in production you should restrict this to authenticated admin users)
CREATE POLICY "Allow anon write access" ON public.products
    FOR ALL USING (true) WITH CHECK (true);

-- Insert Initial Mock Data
INSERT INTO public.products (name, price, category, stock, featured, new_drop, image_url, description)
VALUES 
('Real Madrid 23/24 Home', 2999, 'club', 45, true, true, 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=600&auto=format&fit=crop', 'Premium Real Madrid home kit.'),
('Arsenal 23/24 Away', 2999, 'club', 12, true, true, 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?q=80&w=600&auto=format&fit=crop', 'Hot new Arsenal away kit.'),
('Argentina 2022 Home (3 Stars)', 3499, 'national', 0, false, true, 'https://images.unsplash.com/photo-1522778526582-12248d0301ca?q=80&w=600&auto=format&fit=crop', 'Legendary Argentina kit with 3 stars.'),
('AC Milan 06/07 Retro', 2499, 'retro', 8, false, true, 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop', 'Classic AC Milan retro kit.');
