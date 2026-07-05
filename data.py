from datetime import date

from pydantic import BaseModel


class Product(BaseModel):
    id: int
    name: str
    category: str
    brand: str
    price: float
    rating: float
    in_stock: bool
    tags: list[str]
    created_at: date


PRODUCTS: list[Product] = [
    Product(id=1, name="Trail Runner Sneaker", category="footwear", brand="Nimbus", price=89.99, rating=4.3, in_stock=True, tags=["running", "waterproof"], created_at=date(2025, 11, 2)),
    Product(id=2, name="Classic Leather Loafer", category="footwear", brand="Corbin", price=129.00, rating=4.6, in_stock=True, tags=["formal", "leather"], created_at=date(2025, 3, 14)),
    Product(id=3, name="High-Top Skate Shoe", category="footwear", brand="Vantage", price=64.50, rating=3.9, in_stock=False, tags=["skate", "casual"], created_at=date(2025, 6, 21)),
    Product(id=4, name="Trail Hiking Boot", category="footwear", brand="Nimbus", price=149.99, rating=4.7, in_stock=True, tags=["hiking", "waterproof", "outdoor"], created_at=date(2025, 9, 30)),
    Product(id=5, name="Slide Sandal", category="footwear", brand="Vantage", price=24.99, rating=3.6, in_stock=True, tags=["casual", "summer"], created_at=date(2025, 5, 10)),

    Product(id=6, name="Merino Wool Crewneck", category="apparel", brand="Heathfield", price=79.00, rating=4.5, in_stock=True, tags=["wool", "winter"], created_at=date(2025, 10, 18)),
    Product(id=7, name="Everyday Cotton Tee", category="apparel", brand="Basecamp", price=19.99, rating=4.1, in_stock=True, tags=["cotton", "casual"], created_at=date(2025, 4, 2)),
    Product(id=8, name="Insulated Puffer Jacket", category="apparel", brand="Heathfield", price=189.00, rating=4.8, in_stock=True, tags=["winter", "outdoor"], created_at=date(2025, 11, 20)),
    Product(id=9, name="Slim Fit Chino", category="apparel", brand="Corbin", price=54.00, rating=3.8, in_stock=False, tags=["casual", "formal"], created_at=date(2025, 2, 9)),
    Product(id=10, name="Running Shorts", category="apparel", brand="Nimbus", price=29.99, rating=4.0, in_stock=True, tags=["running", "summer"], created_at=date(2025, 6, 5)),

    Product(id=11, name="Noise Cancelling Headphones", category="electronics", brand="Sonic Pulse", price=249.99, rating=4.6, in_stock=True, tags=["audio", "wireless"], created_at=date(2025, 8, 12)),
    Product(id=12, name="Smart Fitness Watch", category="electronics", brand="Vertex", price=199.00, rating=4.2, in_stock=True, tags=["wearable", "fitness"], created_at=date(2025, 12, 1)),
    Product(id=13, name="Portable Bluetooth Speaker", category="electronics", brand="Sonic Pulse", price=59.99, rating=3.9, in_stock=True, tags=["audio", "wireless", "outdoor"], created_at=date(2025, 7, 22)),
    Product(id=14, name="Mechanical Keyboard", category="electronics", brand="Keystroke", price=139.99, rating=4.7, in_stock=False, tags=["office", "gaming"], created_at=date(2025, 1, 30)),
    Product(id=15, name="4K Action Camera", category="electronics", brand="Vertex", price=299.00, rating=4.4, in_stock=True, tags=["outdoor", "video"], created_at=date(2025, 9, 5)),

    Product(id=16, name="Ceramic Pour-Over Set", category="home", brand="Kettlewell", price=44.99, rating=4.5, in_stock=True, tags=["kitchen", "coffee"], created_at=date(2025, 3, 27)),
    Product(id=17, name="Linen Throw Blanket", category="home", brand="Heathfield", price=69.00, rating=4.3, in_stock=True, tags=["living room", "winter"], created_at=date(2025, 10, 8)),
    Product(id=18, name="Cast Iron Skillet", category="home", brand="Kettlewell", price=39.99, rating=4.8, in_stock=True, tags=["kitchen"], created_at=date(2025, 5, 15)),
    Product(id=19, name="Aromatherapy Diffuser", category="home", brand="Basecamp", price=34.50, rating=3.7, in_stock=False, tags=["living room", "wellness"], created_at=date(2025, 6, 30)),
    Product(id=20, name="Bamboo Cutting Board", category="home", brand="Kettlewell", price=27.99, rating=4.1, in_stock=True, tags=["kitchen"], created_at=date(2025, 4, 19)),

    Product(id=21, name="Leather Wallet", category="accessories", brand="Corbin", price=49.99, rating=4.4, in_stock=True, tags=["leather", "formal"], created_at=date(2025, 2, 22)),
    Product(id=22, name="Polarized Sunglasses", category="accessories", brand="Vantage", price=79.99, rating=4.2, in_stock=True, tags=["summer", "outdoor"], created_at=date(2025, 6, 14)),
    Product(id=23, name="Canvas Tote Bag", category="accessories", brand="Basecamp", price=22.00, rating=3.9, in_stock=True, tags=["casual"], created_at=date(2025, 5, 3)),
    Product(id=24, name="Wool Beanie", category="accessories", brand="Heathfield", price=17.99, rating=4.0, in_stock=True, tags=["winter"], created_at=date(2025, 11, 11)),
    Product(id=25, name="Stainless Steel Water Bottle", category="accessories", brand="Basecamp", price=25.99, rating=4.6, in_stock=False, tags=["outdoor", "fitness"], created_at=date(2025, 7, 1)),

    Product(id=26, name="Wireless Charging Pad", category="electronics", brand="Vertex", price=34.99, rating=3.8, in_stock=True, tags=["wireless", "office"], created_at=date(2025, 8, 28)),
    Product(id=27, name="Yoga Mat", category="apparel", brand="Nimbus", price=32.00, rating=4.3, in_stock=True, tags=["fitness", "wellness"], created_at=date(2025, 9, 17)),
    Product(id=28, name="Espresso Travel Mug", category="home", brand="Kettlewell", price=21.50, rating=4.2, in_stock=True, tags=["kitchen", "coffee", "outdoor"], created_at=date(2025, 3, 9)),
    Product(id=29, name="Ankle Rain Boot", category="footwear", brand="Vantage", price=54.99, rating=3.7, in_stock=True, tags=["waterproof", "casual"], created_at=date(2025, 4, 25)),
    Product(id=30, name="Softshell Vest", category="apparel", brand="Basecamp", price=64.00, rating=4.1, in_stock=True, tags=["outdoor", "winter"], created_at=date(2025, 10, 30)),
]
