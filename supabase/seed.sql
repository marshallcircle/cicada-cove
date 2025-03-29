-- Sample seed data for testing

-- Clear existing data (if any)
TRUNCATE products, orders, order_items, admin_users CASCADE;

-- Seed admin users
INSERT INTO admin_users (email) VALUES 
('admin@cicadacove.com'),
('nick@cicadacove.com');

-- Seed products
INSERT INTO products (title, designer, era, description, condition, price, images, measurements, status, slug) VALUES 
(
  'Issey Miyake Pleated Bomber Jacket',
  'Issey Miyake',
  '1980s',
  'Rare vintage Issey Miyake pleated bomber jacket in black. Features signature pleating throughout with zip front closure and ribbed collar.',
  'Excellent',
  1250.00,
  '[
    {"url": "/images/products/issey-miyake-bomber-1.jpg", "alt": "Front view of Issey Miyake bomber"},
    {"url": "/images/products/issey-miyake-bomber-2.jpg", "alt": "Back view of Issey Miyake bomber"},
    {"url": "/images/products/issey-miyake-bomber-3.jpg", "alt": "Detail of Issey Miyake bomber pleating"}
  ]',
  '{"chest": "54cm", "length": "68cm", "shoulders": "48cm", "sleeves": "63cm"}',
  'active',
  'issey-miyake-pleated-bomber-jacket'
),
(
  'Helmut Lang Vintage Painter Jeans',
  'Helmut Lang',
  '1990s',
  'Iconic Helmut Lang painter jeans from the 1990s. White paint splatter detail on indigo denim. Five pocket design with straight leg cut.',
  'Very Good',
  850.00,
  '[
    {"url": "/images/products/helmut-lang-jeans-1.jpg", "alt": "Front view of Helmut Lang jeans"},
    {"url": "/images/products/helmut-lang-jeans-2.jpg", "alt": "Back view of Helmut Lang jeans"},
    {"url": "/images/products/helmut-lang-jeans-3.jpg", "alt": "Detail of paint splatter on Helmut Lang jeans"}
  ]',
  '{"waist": "82cm", "rise": "26cm", "inseam": "86cm", "leg opening": "18cm"}',
  'active',
  'helmut-lang-vintage-painter-jeans'
),
(
  'Maison Martin Margiela Tabi Boots',
  'Maison Martin Margiela',
  '1990s',
  'Early edition Maison Martin Margiela Tabi boots in black leather. Features the iconic split-toe design and block heel. Made in Italy.',
  'Good',
  1800.00,
  '[
    {"url": "/images/products/margiela-tabi-1.jpg", "alt": "Side view of Margiela Tabi boots"},
    {"url": "/images/products/margiela-tabi-2.jpg", "alt": "Front view of Margiela Tabi boots"},
    {"url": "/images/products/margiela-tabi-3.jpg", "alt": "Sole of Margiela Tabi boots"}
  ]',
  '{"size": "EU 42", "insole": "27.5cm", "heel height": "4cm"}',
  'active',
  'maison-martin-margiela-tabi-boots'
),
(
  'Raf Simons Consumed Sweater',
  'Raf Simons',
  '2000s',
  'Rare Raf Simons "Consumed" oversized knit sweater from AW03 collection. Features graphic text across chest and distressed detailing.',
  'Excellent',
  2200.00,
  '[
    {"url": "/images/products/raf-simons-sweater-1.jpg", "alt": "Front view of Raf Simons sweater"},
    {"url": "/images/products/raf-simons-sweater-2.jpg", "alt": "Back view of Raf Simons sweater"},
    {"url": "/images/products/raf-simons-sweater-3.jpg", "alt": "Detail of graphic on Raf Simons sweater"}
  ]',
  '{"chest": "62cm", "length": "72cm", "shoulders": "60cm", "sleeves": "66cm"}',
  'active',
  'raf-simons-consumed-sweater'
),
(
  'Yohji Yamamoto Pour Homme Wool Coat',
  'Yohji Yamamoto',
  '1980s',
  'Oversized wool coat from Yohji Yamamoto Pour Homme. Features asymmetrical button closure and dramatic collar. Heavyweight wool construction.',
  'Excellent',
  1650.00,
  '[
    {"url": "/images/products/yohji-coat-1.jpg", "alt": "Front view of Yohji Yamamoto coat"},
    {"url": "/images/products/yohji-coat-2.jpg", "alt": "Side view of Yohji Yamamoto coat"},
    {"url": "/images/products/yohji-coat-3.jpg", "alt": "Detail of buttons on Yohji Yamamoto coat"}
  ]',
  '{"chest": "64cm", "length": "118cm", "shoulders": "54cm", "sleeves": "65cm"}',
  'active',
  'yohji-yamamoto-pour-homme-wool-coat'
);

-- Sample order data
INSERT INTO orders (customer_email, shipping_address, total, stripe_payment_id, status) VALUES 
(
  'customer@example.com',
  '{"name": "John Smith", "address1": "123 Fashion St", "address2": "Apt 4B", "city": "New York", "state": "NY", "zip": "10001", "country": "USA", "phone": "+1234567890"}',
  2100.00,
  'pi_3NkM5tLkMZTkBQ0K1gkNx2Kw',
  'paid'
);

-- Sample order items
INSERT INTO order_items (order_id, product_id, price) VALUES 
(
  (SELECT id FROM orders WHERE customer_email = 'customer@example.com' LIMIT 1),
  (SELECT id FROM products WHERE slug = 'helmut-lang-vintage-painter-jeans' LIMIT 1),
  850.00
),
(
  (SELECT id FROM orders WHERE customer_email = 'customer@example.com' LIMIT 1),
  (SELECT id FROM products WHERE slug = 'issey-miyake-pleated-bomber-jacket' LIMIT 1),
  1250.00
);