import { useState, useEffect } from "react";
import { ProductCard } from "../components/product-card";
import { SearchFilters } from "../components/search-filters";
import { fetchProducts, fetchCategories, fetchTags } from './api/api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  // Load initial data - list of products, categories and tags
  useEffect(() => {
    const loadData = async () => {
      const [proData, catData, tagData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchTags(),
      ]);
      setProducts(proData);
      setCategories(catData);
      setTags(tagData);
    };
    loadData();
  }, []);

  // Apply changes when searchTerm, slectedCategory or selectedTags change
  useEffect(() => {
    const timeout = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedCategory, selectedTags]);

  // Apply search and filters by fetching from API
  const applyFilters = async () => {
    const filters = {};

    if (searchTerm.trim() !== "") {
      filters.search = searchTerm;
    }
    if (selectedCategory !== "all") {
      filters.category = selectedCategory;
    }
    if (selectedTags.length > 0) {
      filters.tags = selectedTags;
    }

    const filteredProducts = await fetchProducts(filters);
    setProducts(filteredProducts);
  }

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // clear filters and search
  const handleClearFilters = async () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTags([]);

    // reload all products
    const allProducts = await fetchProducts();
    setProducts(allProducts);
  };

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
          <div className="lg:col-span-1">
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
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {products.length} {products.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              {/* Products Grid */}
              {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {products.map((product) => (
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