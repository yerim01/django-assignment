import './App.css'
import { useState, useMemo } from "react";
import { ProductCard } from "../components/product-card";
// import { SearchFilters } from "../components/search-filters";

// Mock data
// const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports"];

// const tags = [
//   "Popular", "New", "Sale", "Premium", "Eco-friendly", 
//   "Limited Edition", "Featured", "Bestseller", "Trending", "Seasonal"
// ];

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and long battery life",
    category: "Electronics",
    tags: ["Popular", "New", "Premium"]
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    description: "Comfortable organic cotton t-shirt perfect for casual wear and everyday comfort",
    category: "Clothing",
    tags: ["Eco-friendly", "Popular", "Bestseller"]
  },
  {
    id: 3,
    name: "JavaScript Programming Guide",
    description: "Comprehensive guide to modern JavaScript programming with practical examples",
    category: "Books",
    tags: ["Featured", "New", "Bestseller"]
  },
  {
    id: 4,
    name: "Indoor Plant Collection",
    description: "Beautiful set of low-maintenance indoor plants to brighten up your living space",
    category: "Home & Garden",
    tags: ["Eco-friendly", "Trending", "Popular"]
  },
  {
    id: 5,
    name: "Professional Running Shoes",
    description: "Lightweight running shoes designed for professional athletes and fitness enthusiasts",
    category: "Sports",
    tags: ["Premium", "Featured", "Popular"]
  },
  {
    id: 6,
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with AI assistant and premium sound quality",
    category: "Electronics",
    tags: ["Premium", "Trending", "Featured"]
  },
  {
    id: 7,
    name: "Vintage Denim Jacket",
    description: "Classic vintage-style denim jacket with authentic distressing and comfortable fit",
    category: "Clothing",
    tags: ["Vintage", "Popular", "Limited Edition"]
  },
  {
    id: 8,
    name: "Cooking Masterclass Book",
    description: "Professional cooking techniques and recipes from world-renowned chefs",
    category: "Books",
    tags: ["Premium", "Featured", "New"]
  },
  {
    id: 9,
    name: "Garden Tool Set",
    description: "Complete set of essential gardening tools for maintaining your garden and plants",
    category: "Home & Garden",
    tags: ["Popular", "Bestseller", "Seasonal"]
  },
  {
    id: 10,
    name: "Yoga Mat Pro",
    description: "Professional-grade yoga mat with superior grip and cushioning for all practices",
    category: "Sports",
    tags: ["Premium", "Eco-friendly", "Popular"]
  },
  {
    id: 11,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices",
    category: "Electronics",
    tags: ["New", "Trending", "Featured"]
  },
  {
    id: 12,
    name: "Sustainable Hoodie",
    description: "Eco-friendly hoodie made from recycled materials with modern design",
    category: "Clothing",
    tags: ["Eco-friendly", "New", "Limited Edition"]
  },
  {
    id: 13,
    name: "Digital Photography Guide",
    description: "Learn professional digital photography techniques from beginner to advanced level",
    category: "Books",
    tags: ["Featured", "Popular", "New"]
  },
  {
    id: 14,
    name: "LED String Lights",
    description: "Decorative LED string lights perfect for creating ambient lighting in any space",
    category: "Home & Garden",
    tags: ["Popular", "Seasonal", "Trending"]
  },
  {
    id: 15,
    name: "Tennis Racket Pro",
    description: "Professional tennis racket with carbon fiber construction and perfect balance",
    category: "Sports",
    tags: ["Premium", "Featured", "New"]
  },
  {
    id: 16,
    name: "Smartphone Camera Lens Kit",
    description: "Professional camera lens attachment kit for smartphone photography enhancement",
    category: "Electronics",
    tags: ["Premium", "New", "Trending"]
  },
  {
    id: 17,
    name: "Merino Wool Sweater",
    description: "Luxurious merino wool sweater with timeless design and exceptional warmth",
    category: "Clothing",
    tags: ["Premium", "Seasonal", "Popular"]
  },
  {
    id: 18,
    name: "Web Development Handbook",
    description: "Complete handbook covering modern web development frameworks and best practices",
    category: "Books",
    tags: ["Bestseller", "Featured", "New"]
  },
  {
    id: 19,
    name: "Smart Garden System",
    description: "Automated indoor garden system with smart sensors and mobile app control",
    category: "Home & Garden",
    tags: ["Premium", "Eco-friendly", "Trending"]
  },
  {
    id: 20,
    name: "Fitness Tracker Watch",
    description: "Advanced fitness tracker with heart rate monitoring and GPS functionality",
    category: "Sports",
    tags: ["Popular", "Featured", "Trending"]
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search by description
      const matchesSearch = searchTerm === "" || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by category
      const matchesCategory = selectedCategory === "all" || 
        product.category === selectedCategory;

      // Filter by tags (product must have at least one selected tag)
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => product.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchTerm, selectedCategory, selectedTags]);

  // const handleTagToggle = (tag) => {
  //   setSelectedTags(prev => 
  //     prev.includes(tag) 
  //       ? prev.filter(t => t !== tag)
  //       : [...prev, tag]
  //   );
  // };

  // const handleClearFilters = () => {
  //   setSearchTerm("");
  //   setSelectedCategory("all");
  //   setSelectedTags([]);
  // };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1>Product Search</h1>
          <p className="text-muted-foreground">
            Search and filter through our collection of {products.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {/* <div className="lg:col-span-1">
            <SearchFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              categories={categories}
              tags={tags}
              onClearFilters={handleClearFilters}
            />
          </div> */}

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-2">No products found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search criteria or clearing filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}