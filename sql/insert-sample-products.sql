-- Sample Product 1: Issey Miyake Pleated Shirt
INSERT INTO products (
  title, designer, era, description, condition, price, images, measurements, status, slug
) VALUES (
  'Pleated Button-Up Shirt in Black',
  'Issey Miyake',
  '1990s',
  'Rare vintage Issey Miyake pleated button-up shirt in black from the iconic 1990s collection. Features the signature micro-pleating technique that Miyake is renowned for. The pleating creates a textured appearance and makes the garment incredibly lightweight and comfortable to wear. Classic collar and full button closure.',
  'Excellent',
  450.00,
  '["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99", "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3"]'::jsonb,
  '{"chest": "56cm (fits like M/L)", "length": "72cm", "shoulders": "48cm", "sleeves": "62cm"}'::jsonb,
  'active',
  'issey-miyake-pleated-shirt-black-1990s'
) ON CONFLICT (slug) DO NOTHING;

-- Sample Product 2: Yohji Yamamoto Wool Coat
INSERT INTO products (
  title, designer, era, description, condition, price, images, measurements, status, slug
) VALUES (
  'Asymmetrical Wool Coat in Charcoal',
  'Yohji Yamamoto',
  '1980s',
  'Iconic Yohji Yamamoto asymmetrical wool coat from his groundbreaking 1980s collections. Features the designer''s signature oversized silhouette with an asymmetrical front closure, deep pockets, and draped lapels. Made from high-quality heavyweight wool in a deep charcoal gray. The perfect statement piece that embodies the avant-garde Japanese design aesthetic of the era.',
  'Very Good',
  1200.00,
  '["https://images.unsplash.com/photo-1539533018447-63fcce2678e3", "https://images.unsplash.com/photo-1578932750294-f5075e85f44a"]'::jsonb,
  '{"chest": "64cm (oversized)", "length": "90cm", "shoulders": "56cm", "sleeves": "65cm"}'::jsonb,
  'active',
  'yohji-yamamoto-asymmetrical-wool-coat-1980s'
) ON CONFLICT (slug) DO NOTHING;

-- Sample Product 3: Helmut Lang Leather Jacket
INSERT INTO products (
  title, designer, era, description, condition, price, images, measurements, status, slug
) VALUES (
  'Minimalist Leather Biker Jacket',
  'Helmut Lang',
  '1990s',
  'Rare Helmut Lang leather biker jacket from the 1990s. Features the Austrian designer''s signature minimalist approach with clean lines and impeccable construction. Made from buttery-soft black leather with subtle silver-tone hardware. Asymmetrical front zip closure, snap-down lapels, and two front zip pockets. A timeless piece from Lang''s most influential era.',
  'Good',
  950.00,
  '["https://images.unsplash.com/photo-1551028719-00167b16eac5", "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504"]'::jsonb,
  '{"chest": "54cm", "length": "65cm", "shoulders": "46cm", "sleeves": "64cm"}'::jsonb,
  'active',
  'helmut-lang-leather-biker-jacket-1990s'
) ON CONFLICT (slug) DO NOTHING;

-- Sample Product 4: Comme des Garçons Blazer
INSERT INTO products (
  title, designer, era, description, condition, price, images, measurements, status, slug
) VALUES (
  'Deconstructed Wool Blazer with Raw Edges',
  'Comme des Garçons',
  '1980s',
  'Extraordinary Comme des Garçons deconstructed wool blazer from Rei Kawakubo''s influential 1980s collections. Features intentional deconstruction with asymmetrical details, raw unfinished edges, and exposed seams. Made from high-quality black wool with partial lining. A museum-worthy example of Kawakubo''s revolutionary approach to fashion that challenged conventional Western tailoring.',
  'Excellent',
  850.00,
  '["https://images.unsplash.com/photo-1535891169584-1cce69e42f69", "https://images.unsplash.com/photo-1617137968427-85924c800a22"]'::jsonb,
  '{"chest": "55cm", "length": "74cm (asymmetrical)", "shoulders": "46cm (asymmetrical)", "sleeves": "62cm"}'::jsonb,
  'active',
  'comme-des-garcons-deconstructed-blazer-1980s'
) ON CONFLICT (slug) DO NOTHING;

-- Sample Product 5: Dries Van Noten Shirt
INSERT INTO products (
  title, designer, era, description, condition, price, images, measurements, status, slug
) VALUES (
  'Silk Embroidered Button-Up Shirt',
  'Dries Van Noten',
  '1990s',
  'Stunning Dries Van Noten silk shirt featuring intricate embroidery from his early 1990s collection. This piece showcases the Belgian designer''s signature mix of traditional craftsmanship with contemporary design. Made from luxurious cream silk with colorful floral embroidery across the chest and back. Features a classic collar, front button closure, and single chest pocket.',
  'Very Good',
  380.00,
  '["https://images.unsplash.com/photo-1626497764746-6dc36546b388", "https://images.unsplash.com/photo-1604644401890-0bd678c83788"]'::jsonb,
  '{"chest": "58cm", "length": "76cm", "shoulders": "47cm", "sleeves": "64cm"}'::jsonb,
  'active',
  'dries-van-noten-embroidered-silk-shirt-1990s'
) ON CONFLICT (slug) DO NOTHING;