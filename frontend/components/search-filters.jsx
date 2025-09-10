import { X } from "lucide-react";

export function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
  categories,
  tags,
  onClearFilters,
}) {
  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedTags.length > 0;

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      <div className="flex items-center justify-between">
        <h2>Search & Filters</h2>
        {hasActiveFilters && (
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3"
            onClick={onClearFilters}
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label
          className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          htmlFor="search">Search by description
        </label>
        <input
          className="bg-gray-50 border text-foreground border-gray-300 rounded-md text-sm w-full h-9 flex px-3 py-1"
          type="text"
          id="search"
          placeholder="Enter keywords..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
          Category
        </label>
        <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {/* Tags Filter */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
          Tags
        </label>
        <div className="grid grid-cols-2 gap-3">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                checked={selectedTags.includes(tag.id)}
                onChange={() => onTagToggle(tag.id)}
              />
              <label
                htmlFor={`tag-${tag.id}`}
                className="text-sm"
              >
                {tag.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}